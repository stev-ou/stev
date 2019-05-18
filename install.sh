#!/usr/bin/env bash

command -v node >/dev/null 2>&1 || { echo >&2 "Nodejs is not installed.  Aborting."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo >&2 "NPM is not installed.  Aborting."; exit 1; }

echo "Installing required packages..."
npm install
