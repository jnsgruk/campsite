#!/bin/sh
GREEN='\e[1;32m'
NC='\e[0m' # No Color

printHighlighted ()
{
    printf "[${GREEN}$1${NC}]\n"
}

printHighlighted "... nodemoning!"
nodemon --exec 'node --inspect=7001 --trace-warnings -r babel-register ./src/index.js'
printHighlighted "... done!"
