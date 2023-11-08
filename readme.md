[![Build](https://github.com/dsiskov/media-service-ext/actions/workflows/main.yml/badge.svg)](https://github.com/dsiskov/media-service-ext/actions/workflows/main.yml)

# Media Service Extensions

- No real features next to app skeleton yet - stay tuned :musical_note:
- Heroku deployment supported (currently disabled)

## Project purpose

- Familiarize with tech-stack: `Angular, NestJs, Typescript, RxJs, TailwindCSS`
- Design an open-source, production-ready app from the ground-up
- (Maybe) Deliver something fun and useful while at it :)

## How to run locally

```sh
# Install dependencies
cd client && yarn && cd ../server && yarn

# Symlink lib modules
# NB: Ideally `lib` should push to an npm repository
cd ../client && ln -s "../lib" lib && cd ../server && ln -s "../lib" lib

# Create NestJs .env file
cd .. && cat >> ./server/.env << 'END'
SESSION_DISABLE=1
END

# Start the app (default url: localhost:3001)
cd ./client && yarn start
cd ../server && yarn start:dev
```
