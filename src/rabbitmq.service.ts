// src/rabbitmq.service.ts
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { connect } from 'amqplib';
import { AmqpConnectionManager, ChannelWrapper } from 'amqp-connection-manager';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: AmqpConnectionManager;
  private channel: ChannelWrapper;
  private readonly logger = new Logger(RabbitMQService.name);

  async onModuleInit() {
    this.connection = await connect('amqp://localhost:5672'); // Replace with your RabbitMQ server URL
    this.channel = await this.connection.createChannel();
  }

  async emitEvent(queue: string, name: string, data: any) {
    try {
      const payload = JSON.stringify({ name, data }, (_, value) =>
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
