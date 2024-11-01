import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { watchables } from './watchables';
import {
  Chain,
  createPublicClient,
  http,
  PublicClient,
  WatchEventReturnType,
} from 'viem';
import { RabbitMQService } from './rabbitmq.service';

type PublicClientDict = {
  [key: number]: PublicClient;
};

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AppService.name);
  private publicClients: PublicClientDict = {};
  private unwatches: WatchEventReturnType[] = [];

  constructor(readonly rabbitmqService: RabbitMQService) {}

  onModuleInit() {
    watchables.forEach((watchable) => {
      const { event, address, chain, target } = watchable;
      const publicClient: PublicClient = this.createOrGetPublicClient(chain);
      this.unwatches.push(
        publicClient.watchEvent({
          address,
          event,
          onLogs: (logs) => {
            this.logger.log(logs);
            logs.forEach((log) =>
              this.rabbitmqService.emitEvent(target.queue, target.name, log),
            );
          },
        }),
      );
    });
  }

  onModuleDestroy() {
    this.unwatches.forEach((unwatch) => unwatch());
  }

  private createOrGetPublicClient(chain: Chain): PublicClient {
    if (!(chain.id in this.publicClients)) {
      const publicClient = createPublicClient({
        chain,
        transport: http(),
      });
      this.publicClients[chain.id] = publicClient as PublicClient;
    }
    return this.publicClients[chain.id];
  }
}
