// src/rabbitmq.service.ts
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { connect } from 'amqplib';
import { AmqpConnectionManager, ChannelWrapper } from 'amqp-connection-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: AmqpConnectionManager;
  private channel: ChannelWrapper;
  private readonly logger = new Logger(RabbitMQService.name);

  constructor(private readonly configService: ConfigService) { }

  async onModuleInit() {
    const uri = this.configService.get<string>('rmq.uri');
    this.connection = await connect(uri);
    this.channel = await this.connection.createChannel();
  }

  async emitEvent(queue: string, event: string, data: any) {
    try {
      const payload = JSON.stringify({ event, data }, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      );
      await this.channel.sendToQueue(queue, Buffer.from(payload));
      this.logger.log(`Event sent to ${queue}:`, payload);
    } catch (error) {
      this.logger.error('Error sending event:', error);
    }
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }
}
