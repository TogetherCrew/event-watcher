// src/rabbitmq.service.ts
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import RabbitMQ from '@togethercrew.dev/tc-messagebroker';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private readonly logger = new Logger(RabbitMQService.name);

  constructor(private readonly configService: ConfigService) { }

  async onModuleInit() {
    const uri = this.configService.get<string>('rmq.uri');
    RabbitMQ.connect(uri, 'event-watcher').then(() => {
      this.logger.log('RabbitMQ was connected!');
    });
  }

  async emitEvent(queue: string, event: string, data: any) {
    try {
      const payload = { data };
      // const payload = JSON.stringify({ data }, (_, value) =>
      //   typeof value === 'bigint' ? value.toString() : value,
      // );
      RabbitMQ.publish(queue, event, payload);
      this.logger.log(`Event sent to ${queue}:`, payload);
    } catch (error) {
      this.logger.error('Error sending event:', error);
    }
  }
}
