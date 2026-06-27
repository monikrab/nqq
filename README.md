# <img src="https://user-images.githubusercontent.com/4319621/36906314-e3f99680-1e35-11e8-90fd-f959c9641f36.png" alt="Notepadqq" width="32" height="32" /> monikrab's Notepadqq fork

> [!WARNING]  
> This project is actively maintained by myself
> Changes are made to fit my needs, and my needs only
>
> The editor is meant to work on Arch-based distributions, and is not tested anywhere else
>
> If my changes please you, grab one of the releases and try it out!
>
> If you find a flaw or wish for a feature, please fork the project.


### Links

* [What is it?](#what-is-it)
* [Build it yourself](#build-it-yourself)
* [Download it](#distribution-packages)


#### What is it?

Notepadqq is a text editor designed by developers, for developers. 

![screenshot_20180302_163505](https://notepadqq.com/s/images/snapshot1.png)

Please visit our [Wiki](https://github.com/notepadqq/notepadqq/wiki) for more screenshots and details.


Build it yourself
-----

| Build dependencies    | Dependencies      |
|-----------------------|-------------------|
| Qt 6.4 or higher      | Qt 6.4 or higher  |
| qt6-webengine5-dev    | qt6-webengine5    |
| qt6-websockets-dev    | qt6-websockets    |
| qt6-svg-dev           | qt6-svg           |
| qt6-tools-dev-tools   | coreutils         |
| libuchardet-dev       | libuchardet       |
| pkg-config            |                   |
| cmake                 |                   |
| ninja                 |                   |


#### Get the source

    $ git clone --recursive https://github.com/monikrab/nqq.git
    $ cd notepadqq

#### Build

    notepadqq$ cmake --preset release
    notepadqq$ cmake --build --preset release --parallel

To build with debug symbols, use the `dev` preset instead:

    notepadqq$ cmake --preset dev
    notepadqq$ cmake --build --preset dev

If you encounter errors make sure to have the necessary libraries installed. For Arch Linux, you can do that using apt-get:

    sudo apt-get install qt6-tools-dev qt6-tools-dev-tools qt6-webengine-dev qt6-websockets-dev libqt6svg6 libqt6svg6-dev libuchardet-dev pkg-config


#### Install

You can run notepadqq from its build output folder. If however you want to install it, first build it
by following the above steps, then run:

    notepadqq$ sudo cmake --install build/release
