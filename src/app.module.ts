import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitMQModule } from './rabbitmq.module';

@Module({
  imports: [RabbitMQModule],
  providers: [AppService],
})
export class AppModule {}
