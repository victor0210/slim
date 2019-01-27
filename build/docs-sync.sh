#!/bin/bash

cp -R docs/.vuepress/dist/* ../slimdocs
cd ~/Desktop/slimdocs
git add .
git commit -m "update docs"
git push origin master
