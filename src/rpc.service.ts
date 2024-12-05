// src/rpc.service.ts
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { fallback, http, Transport } from 'viem';
import { arbitrum, baseSepolia } from 'viem/chains';

@Injectable()
export class RpcService implements OnModuleInit {
  private readonly logger = new Logger(RpcService.name);
  private transport = {};

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const alchemyApiKey = this.configService.get<string>('rpc.alchemyApiKey');
    const infuraApiKey = this.configService.get<string>('rpc.infuraApiKey');

    this.transport = {
      [baseSepolia.id]: fallback([
        http(`https://base-sepolia.g.alchemy.com/v2/${alchemyApiKey}`),
        http(`https://base-sepolia.infura.io/v3/${infuraApiKey}`),
      ]),
      [arbitrum.id]: fallback([
        http(`https://arb-mainnet.g.alchemy.com/v2/${alchemyApiKey}`),
        http(`https://arbitrum-mainnet.infura.io/v3/${infuraApiKey}`),
      ]),
    };
  }

  public getTransport(chainId: number): Transport {
    const transport = this.transport[chainId];
    if (!transport) {
      throw new Error(`Transport not configured for chain ${chainId}.`);
    }
    return transport;
  }
}
