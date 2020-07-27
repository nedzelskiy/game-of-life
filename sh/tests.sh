#!/usr/bin/env bash
NODE_ENV=test node node_modules/ts-mocha/bin/ts-mocha \
    -p tsconfig.json \
    ./**/*.tests.ts
