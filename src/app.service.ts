import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { watchables } from './watchables';
import {
  AbiEvent,
  Chain,
  createPublicClient,
  PublicClient,
  WatchEventOnLogsParameter,
  WatchEventReturnType,
} from 'viem';
import { RabbitMQService } from './rabbitmq.service';
import { RpcService } from './rpc.service';
import { Target } from './types';

type PublicClientDict = {
  [key: number]: PublicClient;
};

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AppService.name);
  private publicClients: PublicClientDict = {};
  private unwatches: WatchEventReturnType[] = [];

  constructor(
    readonly rabbitmqService: RabbitMQService,
    readonly rpcService: RpcService,
  ) { }

  onModuleInit() {
    try {
      watchables.forEach((watchable) => {
        const { event, address, chain, target } = watchable;
        const publicClient: PublicClient = this.createOrGetPublicClient(chain);
        this.logger.log(
          `Connected to ${publicClient.chain.name} (${publicClient.chain.id})`,
        );
        this.unwatches.push(
          publicClient.watchEvent({
            address,
            event,
            onLogs: (logs) => this.onLogs(logs, target),
          }),
        );
      });
    } catch (error) {
      this.logger.error(`Error initializing watchable: ${error.message}`);
    }
  }

  onModuleDestroy() {
    console.log('Destroying AppService');
    this.unwatches.forEach((unwatch) => unwatch());
  }

  private onLogs(
    logs: WatchEventOnLogsParameter<AbiEvent, [AbiEvent], undefined, string>,
    target: Target,
  ) {
    try {
      this.logger.log(logs);
      logs.forEach((log) =>
        this.rabbitmqService.emitEvent(target.queue, target.event, log),
      );
    } catch (error) {
      this.logger.error(`Error processing logs: ${error.message}`);
    }
  }

  private createOrGetPublicClient(chain: Chain): PublicClient {
    if (!(chain.id in this.publicClients)) {
      const publicClient = createPublicClient({
        chain,
        transport: this.rpcService.getTransport(chain.id),
      });
      this.publicClients[chain.id] = publicClient as PublicClient;
    }
    return this.publicClients[chain.id];
  }
}
