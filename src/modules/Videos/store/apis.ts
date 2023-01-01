// @ts-ignore
import { SigningStargateClient } from "@cosmjs/stargate";

import client from '@/utils/client';
import { getNetwork } from '@/utils/helper';
import { getChainInfo } from '../../../config/chain'

const network = getNetwork();
const chain = getChainInfo();

let signingStargateClient: any = null;

export const getPoll = (params: any) => client.get(`block/${ network }/hash/${ params.hash }`);
export const getPollByHeight = (params: any) => client.get(`block/${ network }/height/${ params.height }`);
export const getPollList = (params: any) => client.get(`block/${ params.network ? params.network : network }/page/${ params.page }${ params.total ? `?total=${ params.total }` : '' }`);

export const getWalletAccounts = async () => {
    if (!window.keplr) {
        alert("Please install keplr extension");
        return;
    }

    console.log('getWalletAccounts', { chain })
    await window.keplr.experimentalSuggestChain(chain)
    await window.keplr.enable(chain.chainId)
    const offlineSigner = window.keplr.getOfflineSigner(chain.chainId)
    if (!signingStargateClient) {
        signingStargateClient = await SigningStargateClient.connectWithSigner(
            chain.rpc,
            offlineSigner
        )
    }
    const accounts = await offlineSigner.getAccounts()
    console.log({ accounts })
    return accounts;
}

export const getAccountBalance = async (address: any) => {
    console.log('getAccountBalance', { address })
    if (!window.keplr) {
        alert("Please install keplr extension");
        return;
    }
    if (!signingStargateClient) {
        alert("Please connect keplr first");
        return;
    }
    const balance = await signingStargateClient.getBalance(address, chain.stakeCurrency.coinMinimalDenom)
    console.log({ balance })
    return `${ balance.amount } ${ balance.denom }`;
}