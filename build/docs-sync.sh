#!/bin/bash

cp -R docs/ ~/Desktop/slimdocs
cd ~/Desktop/slimdocs
git add .
git commit -m "update docs"
git push origin master
