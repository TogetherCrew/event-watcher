# event-watcher
Microservice that watches onchain events to onchain events.

## How

We will define an array of events that the service should be watch.

### Event Definition
```ts
[
  {
    chainId: number,
    contractAddress: string,
    event: string,
    target: {
      queue: string,
      name: string,
    },
  },
]
```

When the application is started, it will load the events and start watching them.

When an event is seen, the service will emit the event as a payload to the given target queue.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
