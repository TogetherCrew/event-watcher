import { AbiEvent, Address, Chain } from 'viem';

export type Target = {
  queue: string;
  event: string;
};

export type Watchable = {
  chain: Chain;
  address: Address;
  event: AbiEvent;
  target: Target;
};
