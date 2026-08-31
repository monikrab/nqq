// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/5/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  var Pos = CodeMirror.Pos;

  function forEach(arr, f) {
    for (var i = 0, e = arr.length; i < e; ++i) f(arr[i]);
  }

  function arrayContains(arr, item) {
    if (!Array.prototype.indexOf) {
      var i = arr.length;
      while (i--) {
        if (arr[i] === item) return true;
      }
      return false;
    }
    return arr.indexOf(item) != -1;
  }

  // Python keywords (Python 3.x)
  var pythonKeywords = ("False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case").split(" ");

  // Python built-in functions and constants
  var pythonBuiltins = ("abs all any ascii bin bool breakpoint bytearray bytes callable chr classmethod compile complex delattr dict dir divmod enumerate eval exec filter float format frozenset getattr globals hasattr hash help hex id input int isinstance issubclass iter len list locals map max memoryview min next object oct open ord pow print property range repr reversed round set setattr slice sorted staticmethod str sum super tuple type vars zip __import__ Ellipsis NotImplemented").split(" ");

  // Common attributes for built-in types
  var stringAttributes = ("capitalize casefold center count encode endswith expandtabs find format format_map index isalnum isalpha isascii isdecimal isdigit isidentifier islower isnumeric isprintable isspace istitle isupper join ljust lower lstrip maketrans partition removeprefix removesuffix replace rfind rindex rjust rpartition rsplit rstrip split splitlines startswith strip swapcase title translate upper zfill").split(" ");
  var listAttributes = ("append clear copy count extend index insert pop remove reverse sort").split(" ");
  var dictAttributes = ("clear copy fromkeys get items keys pop popitem setdefault update values").split(" ");
  var setAttributes = ("add clear copy difference difference_update discard intersection intersection_update isdisjoint issubset issuperset pop remove symmetric_difference symmetric_difference_update union update").split(" ");
  var tupleAttributes = ("count index").split(" ");
  var intAttributes = ("bit_length conjugate from_bytes to_bytes").split(" ");
  var floatAttributes = ("as_integer_ratio is_integer hex").split(" ");
  var objectAttributes = ("__class__ __delattr__ __dict__ __dir__ __doc__ __eq__ __format__ __ge__ __getattribute__ __gt__ __hash__ __init__ __init_subclass__ __le__ __lt__ __ne__ __new__ __reduce__ __reduce_ex__ __repr__ __setattr__ __sizeof__ __str__ __subclasshook__").split(" ");

  // Map type names to their attribute lists
  var typeAttributeMap = {
    "str": stringAttributes,
    "string": stringAttributes,
    "list": listAttributes,
    "dict": dictAttributes,
    "set": setAttributes,
    "frozenset": setAttributes,
    "tuple": tupleAttributes,
    "int": intAttributes,
    "float": floatAttributes,
    "object": objectAttributes
  };

  // Collect variable names from the buffer (simple heuristic)
  function collectVariables(editor) {
    var text = editor.getValue();
    var vars = {};
    // assignments: name = ... (not ==)
    var assignRegex = /\b([A-Za-z_]\w*)\s*(?::[^=]+)?=(?!=)/g;
    var m;
    while ((m = assignRegex.exec(text)) !== null) {
      vars[m[1]] = true;
    }
    // function and class definitions
    var defRegex = /\b(?:def|class)\s+([A-Za-z_]\w*)/g;
    while ((m = defRegex.exec(text)) !== null) {
      vars[m[1]] = true;
    }
    // import statements
    var importRegex = /\bimport\s+([A-Za-z_]\w*)/g;
    while ((m = importRegex.exec(text)) !== null) {
      vars[m[1]] = true;
    }
    importRegex = /\bfrom\s+[A-Za-z_]\w*\s+import\s+([A-Za-z_]\w*)/g;
    while ((m = importRegex.exec(text)) !== null) {
      vars[m[1]] = true;
    }
    return Object.keys(vars);
  }

  // Determine the type of a base token for attribute completion
  function getBaseType(baseToken, options, editor) {
    if (!baseToken) return "unknown";
    var tokenType = baseToken.type;
    var tokenString = baseToken.string;

    // String literal -> str
    if (tokenType == "string") return "string";
    // Number literal -> number (int/float)
    if (tokenType == "number") {
      return tokenString.indexOf('.') != -1 ? "float" : "int";
    }
    // Known built-in type name?
    if (typeAttributeMap[tokenString]) return tokenString;
    // Additional context provided by user
    if (options && options.additionalContext && tokenString in options.additionalContext) {
      return options.additionalContext[tokenString]; // could be a string (type name) or an object
    }
    // Function/class definition?
    if (tokenType == "def" || tokenType == "class") return "function";
    // Fallback
    return "unknown";
  }

  // Gather attribute names from a base type description
  function gatherAttributes(baseType, maybeAdd) {
    if (typeof baseType == "string") {
      var attrs = typeAttributeMap[baseType] || objectAttributes;
      forEach(attrs, maybeAdd);
    } else if (baseType && typeof baseType == "object") {
      // If additionalContext provides an object, use its properties
      for (var name in baseType) maybeAdd(name);
    }
  }

  // Main completion function
  function getPythonCompletions(token, context, options, editor) {
    var found = [], start = token.string;
    function maybeAdd(str) {
      if (str.lastIndexOf(start, 0) == 0 && !arrayContains(found, str)) found.push(str);
    }

    if (context && context.length) {
      // Attribute access: base object is context[0]
      var baseToken = context[0];
      var baseType = getBaseType(baseToken, options, editor);
      gatherAttributes(baseType, maybeAdd);
    } else {
      // No attribute access: suggest keywords, builtins, variables, and additional context
      forEach(pythonKeywords, maybeAdd);
      forEach(pythonBuiltins, maybeAdd);

      // Variables from simple scanning (unless disabled)
      if (!options || options.collectVariables !== false) {
        var vars = collectVariables(editor);
        forEach(vars, maybeAdd);
      }

      // Additional context keys
      if (options && options.additionalContext) {
        for (var key in options.additionalContext) maybeAdd(key);
      }
    }
    return found;
  }

  // Hint function called by CodeMirror
  function pythonHint(editor, options) {
    var cur = editor.getCursor();
    var token = editor.getTokenAt(cur);

    // Ignore comments and strings
    if (token.type == "comment" || token.type == "string") return;

    // If token is not word-like and not a dot, no completions
    if (!/^[\w]*$/.test(token.string)) {
      if (token.string != ".") return;
    }

    // Trim token if it extends past the cursor
    if (token.end > cur.ch) {
      token.end = cur.ch;
      token.string = token.string.slice(0, cur.ch - token.start);
    }

    // Detect attribute access: is the character before the token a dot?
    var line = editor.getLine(cur.line);
    var isAttribute = token.start > 0 && line.charAt(token.start - 1) == '.';
    var context = null;

    if (isAttribute) {
      // Find the token before the dot (the base object)
      var dotPos = {line: cur.line, ch: token.start - 1};
      var dotToken = editor.getTokenAt(dotPos);
      if (dotToken.string == '.') {
        var beforeDot = {line: cur.line, ch: dotToken.start - 1};
        var baseToken = editor.getTokenAt(beforeDot);
        context = [baseToken];
      }
    }

    return {
      list: getPythonCompletions(token, context, options, editor),
      from: Pos(cur.line, token.start),
      to: Pos(cur.line, token.end)
    };
  }

  // Register the helper for Python mode
  CodeMirror.registerHelper("hint", "python", pythonHint);
});
