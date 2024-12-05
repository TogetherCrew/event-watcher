// src/rpc.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { RpcService } from './rpc.service';
import { arbitrum, sepolia, baseSepolia } from 'viem/chains';

describe('RpcService', () => {
  let rpcService: RpcService;
  // let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RpcService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'rpc.alchemyApiKey') {
                return 'test-alchemy-api-key';
              }
              if (key === 'rpc.infuraApiKey') {
                return 'test-infura-api-key';
              }
              return null;
            }),
          },
        },
      ],
    }).compile();

    rpcService = module.get<RpcService>(RpcService);
    // configService = module.get<ConfigService>(ConfigService);
  });

  describe('onModuleInit', () => {
    it('should initialize transport configuration correctly', async () => {
      await rpcService.onModuleInit();

      // Check that transport is configured correctly for arbitrum
      const arbitrumTransport = rpcService['transport'][arbitrum.id];
      expect(arbitrumTransport).toBeDefined();

      // Check that transport is configured correctly for baseSepolia
      const baseSepoliaTransport = rpcService['transport'][baseSepolia.id];
      expect(baseSepoliaTransport).toBeDefined();
    });
  });

  describe('getTransport', () => {
    beforeEach(async () => {
      // Ensure transport is initialized before testing getTransport
      await rpcService.onModuleInit();
    });

    it('should return the transport for a valid chain ID', () => {
      const transport = rpcService.getTransport(arbitrum.id);
      expect(transport).toBeDefined();
    });

    it('should throw an error if the transport for a chain ID is not configured', () => {
      expect(() => rpcService.getTransport(999)).toThrow(
        'Transport not configured for chain 999.',
      );
    });
  });
});
