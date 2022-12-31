import { ChainInfo } from "@keplr-wallet/types"

export const chainId = "dataOcean"

export const getChainInfo = (): ChainInfo => ({
	chainId: chainId,
	chainName: chainId,
	rpc: "http://localhost:26657",
	rest: "http://localhost:1317",
	bip44: {
		coinType: 118,
	},
	bech32Config: {
		bech32PrefixAccAddr: "cosmos",
		bech32PrefixAccPub: "cosmos" + "pub",
		bech32PrefixValAddr: "cosmos" + "valoper",
		bech32PrefixValPub: "cosmos" + "valoperpub",
		bech32PrefixConsAddr: "cosmos" + "valcons",
		bech32PrefixConsPub: "cosmos" + "valconspub",
	},
	currencies: [
		{
			coinDenom: "STAKE",
			coinMinimalDenom: "stake",
			coinDecimals: 0,
			coinGeckoId: "stake",
		},
		{
			coinDenom: "TOKEN",
			coinMinimalDenom: "token",
			coinDecimals: 0,
		},
	],
	feeCurrencies: [
		{
			coinDenom: "STAKE",
			coinMinimalDenom: "stake",
			coinDecimals: 0,
			coinGeckoId: "stake",
		},
	],
	stakeCurrency: {
		coinDenom: "STAKE",
		coinMinimalDenom: "stake",
		coinDecimals: 0,
		coinGeckoId: "stake",
	},
	coinType: 118,
	features: ["ibc-transfer"],
})