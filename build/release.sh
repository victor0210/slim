#!/bin/bash

# package=$1
package="slim"

rm -rf ./release
mkdir -p release/dist
cp -R ./dist/release/$package/* ./release/dist
cp -R src/slim/* ./release
cp package.json README.md ./release
rm -rf dist

release-it
