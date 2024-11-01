// src/rabbitmq.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMQService } from './rabbitmq.service';
import { ConfigService } from '@nestjs/config';

describe('RabbitMQService', () => {
  let service: RabbitMQService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RabbitMQService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => 'amqp://test-uri'),
          },
        },
      ],
    }).compile();

    service = module.get<RabbitMQService>(RabbitMQService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
