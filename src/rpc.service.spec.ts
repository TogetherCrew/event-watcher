// src/rpc.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { RpcService } from './rpc.service';
import { mainnet, sepolia, arbitrumSepolia } from 'viem/chains';

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

      // Check that transport is configured correctly for mainnet
      const mainnetTransport = rpcService['transport'][mainnet.id];
      expect(mainnetTransport).toBeDefined();

      // Check that transport is configured correctly for sepolia
      const sepoliaTransport = rpcService['transport'][sepolia.id];
      expect(sepoliaTransport).toBeDefined();

      // Check that transport is configured correctly for arbitrumSepolia
      const arbitrumTransport = rpcService['transport'][arbitrumSepolia.id];
      expect(arbitrumTransport).toBeDefined();
    });
  });

  describe('getTransport', () => {
    beforeEach(async () => {
      // Ensure transport is initialized before testing getTransport
      await rpcService.onModuleInit();
    });

    it('should return the transport for a valid chain ID', () => {
      const transport = rpcService.getTransport(mainnet.id);
      expect(transport).toBeDefined();
    });

    it('should throw an error if the transport for a chain ID is not configured', () => {
      expect(() => rpcService.getTransport(999)).toThrow(
        'Transport not configured for chain 999.',
      );
    });
  });
});
