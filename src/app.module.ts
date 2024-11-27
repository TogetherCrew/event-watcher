import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitMQModule } from './rabbitmq.module';
import { RpcModule } from './rpc.module';

@Module({
  imports: [RabbitMQModule, RpcModule],
  providers: [AppService],
})
export class AppModule {}
