// src/rpc.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { schemaConfig } from './config/schema.config';
import { rpcConfig } from './config/rpc.config';
import { RpcService } from './rpc.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: schemaConfig,
      isGlobal: true,
      load: [rpcConfig],
    }),
  ],
  providers: [RpcService],
  exports: [RpcService],
})
export class RpcModule { }
