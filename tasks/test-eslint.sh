#!/usr/bin/env bash

find ./dist -name '*.js' | xargs eslint --quiet
