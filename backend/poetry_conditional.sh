#!/bin/sh
prod_env="production"
if [ "$BUILD_ENV" != "$prod_env" ]; then 
    poetry install --no-root --no-interaction --no-ansi; else 
    poetry install --no-dev --no-root --no-interaction --no-ansi;
fi