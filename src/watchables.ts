import { AbiEvent, Address, Chain, parseAbiItem } from 'viem';
import { sepolia } from 'viem/chains';

type Watchable = {
  chain: Chain;
  address: Address;
  event: AbiEvent;
  target: {
    queue: string;
    name: string;
  };
};

export const watchables: Watchable[] = [
  // Example: Watch WETH Transfer (Ethereum)
  // {
  //   chain: mainnet,
  //   address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  //   event: parseAbiItem(
  //     'event Transfer(address indexed from, address indexed to, uint256 value)',
  //   ),
  //   target: {
  //     queue: 'TestQueue',
  //     name: 'TestEvent',
  //   },
  // },
  {
    chain: sepolia,
    address: '0x8ff1dd3967a87c1eb46bd60b2bbf9d7eaa987c1b',
    event: parseAbiItem(
      'event Issue(address indexed account, uint indexed tokenId)',
    ),
    target: {
      queue: 'SERVER_API',
      name: 'EngagementTokenIssued',
    },
  },
];
