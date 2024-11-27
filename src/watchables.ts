import { parseAbiItem } from 'viem';
import { baseSepolia } from 'viem/chains';
import { Watchable } from './types';
import { Event, Queue } from '@togethercrew.dev/tc-messagebroker';

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
  //     event: 'TestEvent',
  //   },
  // },
  {
    chain: baseSepolia,
    address: '0xCc80586fd99f6804013eA2D43169fc60e466D354',
    event: parseAbiItem(
      'event Issue(address indexed account, uint indexed tokenId)',
    ),
    target: {
      queue: Queue.SERVER_API,
      event: Event.SERVER_API.EngagementTokenIssued,
    },
  },
  // {
  //   chain: arbitrumSepolia,
  //   address: '0x14A19Db36DfB60C41932daE2d1c1b15Bd0f99792',
  //   event: parseAbiItem(
  //     'event Transfer(address indexed from, address indexed to, uint256 value)',
  //   ),
  //   target: {
  //     queue: 'TestQueue',
  //     event: 'TestEvent',
  //   },
  // },
];
