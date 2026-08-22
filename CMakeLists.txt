cmake_minimum_required(VERSION 3.24)

project(notepadqq VERSION 2.2.0 LANGUAGES CXX)

include(GNUInstallDirs)

option(NQQ_BUILD_TESTS "Build Notepadqq tests" OFF)
option(NQQ_ENABLE_ASAN "Enable AddressSanitizer" OFF)
option(NQQ_ENABLE_UBSAN "Enable UndefinedBehaviorSanitizer" OFF)
# option(NQQ_BUILD_SNAP "Build Notepadqq for Snap packaging" OFF)
# option(NQQ_USE_MONACO "Use Monaco Editor instead of CodeMirror" OFF)

set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

find_package(Qt6 6.4 REQUIRED COMPONENTS
    Core
    Core5Compat
    DBus
    Gui
    LinguistTools
    Network
    PrintSupport
    Svg
    Test
    WebChannel
    WebEngineWidgets
    WebSockets
    Widgets
)
find_package(PkgConfig REQUIRED)
pkg_check_modules(UCHARDET REQUIRED IMPORTED_TARGET uchardet)

qt_standard_project_setup(REQUIRES 6.4)

set(NQQ_ROOT_DIR "${CMAKE_CURRENT_SOURCE_DIR}")
set(NQQ_UI_DIR "${NQQ_ROOT_DIR}/src/ui")
set(NQQ_SUPPORT_DIR "${NQQ_ROOT_DIR}/support_files")
set(NQQ_STAGED_APPDATA_DIR "${CMAKE_CURRENT_BINARY_DIR}/appdata")

set(NQQ_APP_SOURCES
    src/ui/main.cpp
    src/ui/mainwindow.cpp
    src/ui/documentcontroller.cpp
    src/ui/editoruicontroller.cpp
    src/ui/windowuicontroller.cpp
    src/ui/topeditorcontainer.cpp
    src/ui/editortabwidget.cpp
    src/ui/docengine.cpp
    src/ui/frmabout.cpp
    src/ui/notepadqq.cpp
    src/ui/frmpreferences.cpp
    src/ui/iconprovider.cpp
    src/ui/EditorNS/editor.cpp
    src/ui/EditorNS/asyncrequesttracker.cpp
    src/ui/EditorNS/bannerfilechanged.cpp
    src/ui/EditorNS/bannerbasicmessage.cpp
    src/ui/EditorNS/bannerfileremoved.cpp
    src/ui/EditorNS/customqwebview.cpp
    src/ui/EditorNS/languageservice.cpp
    src/ui/clickablelabel.cpp
    src/ui/frmencodingchooser.cpp
    src/ui/EditorNS/bannerindentationdetected.cpp
    src/ui/frmindentationmode.cpp
    src/ui/singleapplication.cpp
    src/ui/localcommunication.cpp
    src/ui/Search/frmsearchreplace.cpp
    src/ui/Search/searchstring.cpp
    src/ui/Search/searchhelpers.cpp
    src/ui/Search/advancedsearchdock.cpp
    src/ui/Extensions/extension.cpp
    src/ui/frmlinenumberchooser.cpp
    src/ui/Extensions/extensionsserver.cpp
    src/ui/Extensions/Stubs/stub.cpp
    src/ui/Extensions/runtimesupport.cpp
    src/ui/Extensions/Stubs/windowstub.cpp
    src/ui/Extensions/Stubs/notepadqqstub.cpp
    src/ui/Extensions/Stubs/editorstub.cpp
    src/ui/Extensions/extensionsloader.cpp
    src/ui/globals.cpp
    src/ui/Extensions/Stubs/menuitemstub.cpp
    src/ui/Extensions/installextension.cpp
    src/ui/keygrabber.cpp
    src/ui/Sessions/sessions.cpp
    src/ui/Sessions/persistentcache.cpp
    src/ui/nqqsettings.cpp
    src/ui/nqqrun.cpp
    src/ui/Search/filesearcher.cpp
    src/ui/Search/filereplacer.cpp
    src/ui/Search/searchobjects.cpp
    src/ui/Search/searchinstance.cpp
    src/ui/stats.cpp
    src/ui/statsruntime.cpp
    src/ui/localsockethelpers.cpp
    src/ui/commandlineopenruntime.cpp
    src/ui/Sessions/backupservice.cpp
    src/ui/svgiconengine.cpp
)

set(NQQ_APP_HEADERS
    src/ui/include/mainwindow.h
    src/ui/include/documentcontroller.h
    src/ui/include/editoruicontroller.h
    src/ui/include/windowuicontroller.h
    src/ui/include/topeditorcontainer.h
    src/ui/include/editortabwidget.h
    src/ui/include/docengine.h
    src/ui/include/frmabout.h
    src/ui/include/notepadqq.h
    src/ui/include/frmpreferences.h
    src/ui/include/iconprovider.h
    src/ui/include/EditorNS/editor.h
    src/ui/include/EditorNS/asyncrequesttracker.h
    src/ui/include/EditorNS/bannerfilechanged.h
    src/ui/include/EditorNS/bannerbasicmessage.h
    src/ui/include/EditorNS/bannerfileremoved.h
    src/ui/include/EditorNS/customqwebview.h
    src/ui/include/clickablelabel.h
    src/ui/include/frmencodingchooser.h
    src/ui/include/EditorNS/bannerindentationdetected.h
    src/ui/include/EditorNS/languageservice.h
    src/ui/include/frmindentationmode.h
    src/ui/include/singleapplication.h
    src/ui/include/localcommunication.h
    src/ui/include/Search/frmsearchreplace.h
    src/ui/include/Search/advancedsearchdock.h
    src/ui/include/Search/searchhelpers.h
    src/ui/include/Search/searchstring.h
    src/ui/include/Extensions/extension.h
    src/ui/include/frmlinenumberchooser.h
    src/ui/include/Extensions/extensionsserver.h
    src/ui/include/Extensions/Stubs/stub.h
    src/ui/include/Extensions/runtimesupport.h
    src/ui/include/Extensions/Stubs/windowstub.h
    src/ui/include/Extensions/Stubs/notepadqqstub.h
    src/ui/include/Extensions/Stubs/editorstub.h
    src/ui/include/Extensions/extensionsloader.h
    src/ui/include/globals.h
    src/ui/include/Extensions/Stubs/menuitemstub.h
    src/ui/include/Extensions/installextension.h
    src/ui/include/keygrabber.h
    src/ui/include/Sessions/sessions.h
    src/ui/include/Sessions/persistentcache.h
    src/ui/include/nqqsettings.h
    src/ui/include/nqqrun.h
    src/ui/include/Search/filesearcher.h
    src/ui/include/Search/searchobjects.h
    src/ui/include/Search/filereplacer.h
    src/ui/include/Search/searchinstance.h
    src/ui/include/stats.h
    src/ui/include/statsruntime.h
    src/ui/include/localsockethelpers.h
    src/ui/include/commandlineopenruntime.h
    src/ui/include/Sessions/backupservice.h
    src/ui/include/svgiconengine.h
)

set(NQQ_APP_FORMS
    src/ui/mainwindow.ui
    src/ui/frmabout.ui
    src/ui/frmpreferences.ui
    src/ui/frmencodingchooser.ui
    src/ui/frmindentationmode.ui
    src/ui/Search/dlgsearching.ui
    src/ui/Search/frmsearchreplace.ui
    src/ui/frmlinenumberchooser.ui
    src/ui/Extensions/installextension.ui
)

file(READ "${NQQ_UI_DIR}/resources.qrc" NQQ_ICONS_QRC)

# Remove translations section from the icons resource file
string(FIND "${NQQ_ICONS_QRC}" "    <qresource prefix=\"/translations\">" NQQ_TRANSLATIONS_QRC_POS)
if(NQQ_TRANSLATIONS_QRC_POS GREATER -1)
    string(SUBSTRING "${NQQ_ICONS_QRC}" 0 ${NQQ_TRANSLATIONS_QRC_POS} NQQ_ICONS_QRC)
    string(APPEND NQQ_ICONS_QRC "</RCC>\n")
endif()

# Fix icon paths
string(REPLACE ">icons/" ">${NQQ_UI_DIR}/icons/" NQQ_ICONS_QRC "${NQQ_ICONS_QRC}")

set(NQQ_GENERATED_ICONS_QRC "${CMAKE_CURRENT_BINARY_DIR}/notepadqq-icons.qrc")
file(WRITE "${NQQ_GENERATED_ICONS_QRC}" "${NQQ_ICONS_QRC}")

set(NQQ_TARGET_NAME notepadqq)

qt_add_executable(${NQQ_TARGET_NAME} MACOSX_BUNDLE
    ${NQQ_APP_SOURCES}
    ${NQQ_APP_HEADERS}
    ${NQQ_APP_FORMS}
    ${NQQ_GENERATED_ICONS_QRC}
)

target_include_directories(${NQQ_TARGET_NAME} PRIVATE
    src/ui
    src/ui/include
    src/ui/libs/qtpromise/include
    src/ui/libs/qtpromise/src
)

if(NQQ_BUILD_SNAP)
    target_compile_definitions(${NQQ_TARGET_NAME} PRIVATE BUILD_SNAP)
endif()

set_target_properties(${NQQ_TARGET_NAME} PROPERTIES
    AUTOUIC_SEARCH_PATHS "${NQQ_UI_DIR};${NQQ_UI_DIR}/Search;${NQQ_UI_DIR}/Extensions"
)

target_compile_definitions(${NQQ_TARGET_NAME} PRIVATE QT_NO_URL_CAST_FROM_STRING)

target_compile_options(${NQQ_TARGET_NAME} PRIVATE
    $<$<CXX_COMPILER_ID:GNU,Clang,AppleClang>:-Wold-style-cast>
    # Workaround for upstream qtpromise bug (v0.7.0): qpromise_p.h forward-declares
    # QPromiseConversionException but never includes qpromiseexceptions.h where it's
    # defined. This causes "invalid use of incomplete type" when thrown at line 593.
    -include qtpromise/qpromiseexceptions.h
)

target_link_libraries(${NQQ_TARGET_NAME} PRIVATE
    Qt6::Core
    Qt6::Core5Compat
    Qt6::DBus
    Qt6::Gui
    Qt6::Network
    Qt6::PrintSupport
    Qt6::Svg
    Qt6::WebChannel
    Qt6::WebEngineWidgets
    Qt6::WebSockets
    Qt6::Widgets
    PkgConfig::UCHARDET
)

set(NQQ_SANITIZER_FLAGS "")
if(NQQ_ENABLE_ASAN)
    list(APPEND NQQ_SANITIZER_FLAGS -fsanitize=address -fno-omit-frame-pointer)
endif()
if(NQQ_ENABLE_UBSAN)
    list(APPEND NQQ_SANITIZER_FLAGS -fsanitize=undefined -fno-omit-frame-pointer)
endif()
if(NQQ_SANITIZER_FLAGS)
    target_compile_options(${NQQ_TARGET_NAME} PRIVATE ${NQQ_SANITIZER_FLAGS})
    target_link_options(${NQQ_TARGET_NAME} PRIVATE ${NQQ_SANITIZER_FLAGS})
endif()

find_program(NQQ_MAKE_EXECUTABLE NAMES gmake make)
if(NQQ_MAKE_EXECUTABLE)
    if(APPLE)
        add_custom_command(TARGET ${NQQ_TARGET_NAME} POST_BUILD
            COMMAND "${CMAKE_COMMAND}" -E rm -rf "$<TARGET_BUNDLE_CONTENT_DIR:${NQQ_TARGET_NAME}>/Resources/editor"
            COMMAND "${NQQ_MAKE_EXECUTABLE}" DESTDIR="$<TARGET_BUNDLE_CONTENT_DIR:${NQQ_TARGET_NAME}>/Resources/editor" ${NQQ_MAKE_MONACO_ARGS}
            WORKING_DIRECTORY "${NQQ_ROOT_DIR}/src/editor"
            COMMENT "Staging editor assets in app bundle"
            VERBATIM
        )
        add_custom_command(TARGET ${NQQ_TARGET_NAME} POST_BUILD
            COMMAND "${CMAKE_COMMAND}" -E rm -rf "$<TARGET_BUNDLE_CONTENT_DIR:${NQQ_TARGET_NAME}>/Resources/extension_tools"
            COMMAND "${NQQ_MAKE_EXECUTABLE}" DESTDIR="$<TARGET_BUNDLE_CONTENT_DIR:${NQQ_TARGET_NAME}>/Resources/extension_tools"
            WORKING_DIRECTORY "${NQQ_ROOT_DIR}/src/extension_tools"
            COMMENT "Staging extension tools in app bundle"
            VERBATIM
        )
    else()
        add_custom_target(notepadqq_editor_assets ALL
            COMMAND "${CMAKE_COMMAND}" -E rm -rf "${NQQ_STAGED_APPDATA_DIR}/editor"
            COMMAND "${NQQ_MAKE_EXECUTABLE}" DESTDIR="${NQQ_STAGED_APPDATA_DIR}/editor" ${NQQ_MAKE_MONACO_ARGS}
            WORKING_DIRECTORY "${NQQ_ROOT_DIR}/src/editor"
            COMMENT "Staging editor assets"
            VERBATIM
        )
        add_custom_target(notepadqq_extension_tools ALL
            COMMAND "${CMAKE_COMMAND}" -E rm -rf "${NQQ_STAGED_APPDATA_DIR}/extension_tools"
            COMMAND "${NQQ_MAKE_EXECUTABLE}" DESTDIR="${NQQ_STAGED_APPDATA_DIR}/extension_tools"
            WORKING_DIRECTORY "${NQQ_ROOT_DIR}/src/extension_tools"
            COMMENT "Staging extension tools"
            VERBATIM
        )
        add_dependencies(${NQQ_TARGET_NAME} notepadqq_editor_assets notepadqq_extension_tools)
    endif()
else()
    message(WARNING "Could not find make/gmake; editor and extension tool assets will not be staged")
endif()

if(UNIX AND NOT APPLE)
    install(DIRECTORY "${NQQ_STAGED_APPDATA_DIR}/editor" "${NQQ_STAGED_APPDATA_DIR}/extension_tools"
        DESTINATION "${CMAKE_INSTALL_DATADIR}/notepadqq"
    )
    install(FILES "${NQQ_SUPPORT_DIR}/shortcuts/notepadqq.desktop"
        DESTINATION "${CMAKE_INSTALL_DATADIR}/applications"
    )
    install(FILES "${NQQ_SUPPORT_DIR}/com.notepadqq.Notepadqq.metainfo.xml"
        DESTINATION "${CMAKE_INSTALL_DATADIR}/metainfo"
    )
    install(FILES "${NQQ_SUPPORT_DIR}/manpage/notepadqq.1"
        DESTINATION "${CMAKE_INSTALL_MANDIR}/man1"
    )

    foreach(NQQ_ICON_SIZE 16 22 24 32 48 64 96 128 256 512)
        install(FILES "${NQQ_SUPPORT_DIR}/icons/hicolor/${NQQ_ICON_SIZE}x${NQQ_ICON_SIZE}/apps/notepadqq.png"
            DESTINATION "${CMAKE_INSTALL_DATADIR}/icons/hicolor/${NQQ_ICON_SIZE}x${NQQ_ICON_SIZE}/apps"
        )
    endforeach()
    install(FILES "${NQQ_SUPPORT_DIR}/icons/hicolor/scalable/apps/notepadqq.svg"
        DESTINATION "${CMAKE_INSTALL_DATADIR}/icons/hicolor/scalable/apps"
    )
endif()

if(NOT TARGET uninstall)
    configure_file(
        "${CMAKE_CURRENT_SOURCE_DIR}/cmake_uninstall.cmake.in"
        "${CMAKE_CURRENT_BINARY_DIR}/cmake_uninstall.cmake"
        @ONLY
    )

    add_custom_target(uninstall
        COMMAND ${CMAKE_COMMAND} -P ${CMAKE_CURRENT_BINARY_DIR}/cmake_uninstall.cmake
        COMMENT "Uninstalling Notepadqq"
        VERBATIM
    )
endif()
