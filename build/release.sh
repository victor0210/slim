#!/bin/bash

package=$1

echo $package

mkdir -p release/$package

cp -R src/$package/* ./release/$package
cp LICENSE README.md ./release/$package/
mkdir -p release/$package/dist
cp -R ./dist/release/$package/* ./release/$package/dist

cd release/$package

release-it
