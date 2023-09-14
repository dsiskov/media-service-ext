# Media Service Extensions

## Project purpose

- Familiarize with tech-stack: `Angular, NestJs, Typescript, RxJs, TailwindCSS`
- Design an open-source `production-ready` app from the ground-up
- Follow the [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) strategy, incremental commits & quick time-to-market
- (Maybe) Deliver something fun and useful while doing so :)

## How to run locally

```sh
# Install dependencies
cd client && yarn && cd ../server && yarn

# Symlink lib modules
# Tip: Ideally refactor `lib` to push to an npm repository
cd ../client && ln -s "../lib" lib && cd ../server && ln -s "../lib" lib

# Create NestJs .env file
cd .. && cat >> ./server/.env << 'END'
SESSION_HOST=local.host
SESSION_PORT=6382
SESSION_PREFIX=dvox
SESSION_SECRET=secret
SESSION_MAX_AGE=600000
END

# Start the app (default url: localhost:3001)
cd ../client && yarn start
cd ../server && yarn start:dev
```
