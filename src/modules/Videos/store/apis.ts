// @ts-ignore
import { SigningStargateClient } from "@cosmjs/stargate";

import client from '@/utils/client';
import { getNetwork } from '@/utils/helper';
import { getChainInfo } from '../../../config/chain'

const network = getNetwork();
const chain = getChainInfo();

let signingStargateClient: any = null;

export const getVideo = (params: any) => client.get(`/dataocean/dataocean/video/${ params.id }`);
export const getPollByHeight = (params: any) => client.get(`block/${ network }/height/${ params.height }`);

export const getWalletAccounts = async () => {
    if (!window.keplr) {
        alert("Please install keplr extension");
        return;
    }

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
    return accounts;
}

export const getAccountBalance = async (address: any) => {
    if (!window.keplr) {
        alert("Please install keplr extension");
        return;
    }
    if (!signingStargateClient) {
        alert("Please connect keplr first");
        return;
    }
    const balance = await signingStargateClient.getBalance(address, chain.stakeCurrency.coinMinimalDenom)
    return `${ balance.amount } ${ balance.denom }`;
}

export const getVideoServerNotify = (params: any) => {

    client.get('http://127.0.0.1/videoPlay', params);
}