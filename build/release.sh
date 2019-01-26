#!/bin/bash

# package=$1
package="slim"

rm -rf ./release
cp -R ./dist/release/$package ./release
cp package.json README.md ./release
release-it
