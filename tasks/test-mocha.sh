#!/bin/bash

# set -x #echo on


# `test-mocha` runs mocha tests

# expects to be run from root
ROOT_DIR=.
SRC_DIR=$ROOT_DIR/src
DIST_DIR=$ROOT_DIR/dist

# add local node_modules bin to path
NODE_BIN=$ROOT_DIR/node_modules/.bin
PATH=$PATH:$NODE_BIN

# this would be the simple case, but it misses
# *.mocha.tests dirs, which I want to support
# mocha \
# 	"./dist/**/*.mocha.tests.js" \
# 	$MOCHA


# so, instead we find all matching test files/dirs,
# sort them,
# and pipe into mocha via xargs
( \
	find \
		$DIST_DIR \
		\( -type f -and -name *.mocha.tests.js \) -or \
		\( -type f -and -path *.mocha.tests\/index.js \) \
	| \
	sort \
		--stable \
		--ignore-case \
		--field-separator=/ \
		--key=2.2 \
		--key=2.1 \
	| \
	xargs \
		mocha \
			--exit \
			--sort \
			--timeout=60000 \
			$MOCHA \
)
