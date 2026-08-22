
# <img src="https://user-images.githubusercontent.com/4319621/36906314-e3f99680-1e35-11e8-90fd-f959c9641f36.png" alt="Notepadqq" width="32" height="32" /> monikrab's Notepadqq fork


### Links

* [What is it?](#what-is-it)
* [Build it yourself](#build-it-yourself)



#### What is it?

Notepadqq is a text editor designed for developers. This is my own opinionated fork, with changes made according to my needs.

![screenshot_20180302_163505](https://notepadqq.com/s/images/snapshot_math.png)

Refer to [Notepadqq's wiki](https://github.com/notepadqq/notepadqq/wiki) for more screenshots and details.



Build it yourself
-----

| Build dependencies  | Dependencies      |
|---------------------|-------------------|
| Qt 6.4 or higher    | Qt 6.4 or higher  |
| qt6-webengine       | qt6-webengine     |
| qt6-websockets      | qt6-websockets    |
| qt6-svg             | qt6-svg           |
| qt6-tools           | coreutils         |
| uchardet            | uchardet          |
| pkgconf             |                   |



#### Get the source

    $ git clone --recursive https://github.com/monikrab/nqq.git
    $ cd notepadqq



#### Build

    notepadqq$ cmake --preset release
    notepadqq$ cmake --build --preset release

To build with debug symbols, use the `dev` preset instead:

    notepadqq$ cmake --preset dev
    notepadqq$ cmake --build --preset dev

If you encounter errors make sure to have the necessary libraries installed. For Arch you can do that using `yay`:

    yay -S qt6-tools qt6-tools-dev-tools qt6-webengine qt6-websockets qt6-svg uchardet pkgconf



#### Install

You can run notepadqq from its build output folder. If however you want to install it, first build it
by following the above steps, then run:

    notepadqq$ sudo cmake --install build/release
