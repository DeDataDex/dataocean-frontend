// @ts-ignore
import { SigningStargateClient } from "@cosmjs/stargate";

import client from '@/utils/client';
import { getChainInfo } from '../../../config/chain'

const chain = getChainInfo();

let signingStargateClient: any = null;

export const getGrantee = (params: any) => client.get(`/cosmos/auth/v1beta1/module_accounts/${ params.chainId }`);
export const getVideo = (params: any) => client.get(`/dataocean/dataocean/video/${ params.id }`);

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
    return `${ Number.parseFloat(`${ balance.amount / 1000000 }`).toFixed(6) } ${ balance.denom }`;
}

export const senderVoucher = (params: any) => {
    const bodyFormData = new FormData();
    bodyFormData.append('payData', params.payData);
    bodyFormData.append('paySign', params.paySign);

    client.post(`${ process.env.REACT_APP_DATA_OCEAN_BACKEND_URL }/senderVoucher`, bodyFormData);
}