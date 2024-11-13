export const rpcConfig = (): Record<string, unknown> => ({
  rpc: {
    alchemyApiKey: process.env.ALCHEMY_API_KEY,
    infuraApiKey: process.env.INFURA_API_KEY,
  },
});
