#!/usr/bin/env bash

command -v node >/dev/null 2>&1 || { echo >&2 "Nodejs is not installed.  Aborting."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo >&2 "NPM is not installed.  Aborting."; exit 1; }

echo "Checking system-level dependencies..."
#sudo apt install -y gcc make libpng-dev
command -v gcc >/dev/null 2>&1 || { echo >&2 "GCC is not installed.  Aborting."; exit 1; }
command -v make >/dev/null 2>&1 || { echo >&2 "Make is not installed.  Aborting."; exit 1; }

echo "Installing required npm packages..."
npm install
