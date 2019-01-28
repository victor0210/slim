#!/bin/bash

# package=$1
package="slim"

rm -rf ./release
mkdir -p release/dist
cp -R ./dist/release/$package/* ./release/dist
cp -R src/$package/* ./release
cp package.json LICENSE README.md ./release
rm -rf dist

release-it
