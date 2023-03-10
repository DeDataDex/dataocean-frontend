import { ChainInfo } from "@keplr-wallet/types"

export const chainId = process.env.REACT_APP_DATA_OCEAN_CHAIN_ID || ''

export const getChainInfo = (): ChainInfo => ({
	chainId: chainId,
	chainName: chainId,
	rpc: process.env.REACT_APP_DATA_OCEAN_RPC_URL || '',
	rest: process.env.REACT_APP_DATA_OCEAN_REST_URL || '',
	bip44: {
		coinType: 118,
	},
	bech32Config: {
		bech32PrefixAccAddr: "cosmos",
		bech32PrefixAccPub: "cosmospub",
		bech32PrefixValAddr: "cosmosvaloper",
		bech32PrefixValPub: "cosmosvaloperpub",
		bech32PrefixConsAddr: "cosmosvalcons",
		bech32PrefixConsPub: "cosmosvalconspub",
	},
	currencies: [
		{
			coinDenom: "TOKEN",
			coinMinimalDenom: "token",
			coinDecimals: 6,
		}
	],
	feeCurrencies: [
		{
			coinDenom: "TOKEN",
			coinMinimalDenom: "token",
			coinDecimals: 6,
		},
	],
	stakeCurrency: {
		coinDenom: "TOKEN",
		coinMinimalDenom: "token",
		coinDecimals: 6,
	},
	coinType: 118,
	features: ["ibc-transfer"],
})