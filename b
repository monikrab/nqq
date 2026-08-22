#!/usr/bin/env bash

rm -rf build/

cmake --preset release
cmake --build --preset release
