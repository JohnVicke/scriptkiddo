#!/usr/bin/env bash

if ! [ -x "$(command -v docker)" ]; then
  echo 'Error: docker is not installed.' >&2
  echo 'Install it here: https://docs.docker.com/install/' >&2
  exit 1
fi

docker --version

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  # install it here:
  echo 'Install it here: https://docs.docker.com/compose/install/' >&2
  exit 1
fi

docker-compose --version

if ! [ -x "$(command -v rustc)" ]; then
  echo 'Error: rust is not installed.' >&2
  echo 'Install it here: https://www.rust-lang.org/tools/install' >&2
  exit 1
fi

rustc --version

if ! [ -x "$(command -v pnpm)" ]; then
  echo 'Error: pnpm is not installed.' >&2
  echo 'Install it here: https://pnpm.js.org/en/installation' >&2
  exit 1
fi

pnpm --version


echo "🎉 Everything is installed! 🎉"


echo "Copying .env.example to .env in ./apps/api"
cat ./apps/api/.env.example > ./apps/api/.env

