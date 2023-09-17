[![Build and deploy](https://github.com/dsiskov/media-service-ext/actions/workflows/main.yml/badge.svg)](https://github.com/dsiskov/media-service-ext/actions/workflows/main.yml)

# Media Service Extensions

- Auto deployed [here](https://media-ext-9a19cc1d8e3d.herokuapp.com)
- No real features next to app skeleton yet - stay tuned :musical_note:

## Project purpose

- Familiarize with tech-stack: `Angular, NestJs, Typescript, RxJs, TailwindCSS`
- Design an open-source, production-ready app from the ground-up
- Following principles: [Agile](https://agilemanifesto.org/principles.html), [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product), [trunk-based-development](https://efelti.com/tech/?p=87), optimize for [lead-time-of-changes](https://www.leanix.net/en/wiki/vsm/dora-metrics#lead-time-for-changes)
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
