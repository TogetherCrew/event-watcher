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
