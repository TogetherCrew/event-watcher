// src/app.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { RabbitMQModule } from './rabbitmq.module';
import { RpcModule } from './rpc.module';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RabbitMQModule, RpcModule],
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
