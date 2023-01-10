import { GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing"
import {
    defaultRegistryTypes,
    DeliverTxResponse,
    QueryClient,
    SigningStargateClient,
    SigningStargateClientOptions,
    StdFee,
} from "@cosmjs/stargate"
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc"
import { MsgGrant, } from "cosmjs-types/cosmos/authz/v1beta1/tx";
import { SendAuthorization as SendAuthorizationProto } from "cosmjs-types/cosmos/bank/v1beta1/authz";
import Long from "long"
import { DataOceanExtension, setupDataOceanExtension } from "./modules/dataocean/queries"
import {
    dataoceanTypes,
    MsgCreateVideoEncodeObject,
    typeUrlMsgCreateVideo,
    MsgPlayVideoEncodeObject,
    typeUrlMsgPlayVideo,
    MsgPaySignEncodeObject,
    typeUrlMsgPaySign,
} from "./types/dataocean/messages"
import { EncodeObject } from "@cosmjs/proto-signing"


export const dataoceanDefaultRegistryTypes: ReadonlyArray<[string, GeneratedType]> = [
    ...defaultRegistryTypes,
    ...dataoceanTypes,
]

function createDefaultRegistry(): Registry {
    return new Registry(dataoceanDefaultRegistryTypes)
}

export class DataOceanSigningStargateClient extends SigningStargateClient {
    public readonly dataoceanQueryClient: DataOceanExtension | undefined

    public static async connectWithSigner(
        endpoint: string,
        signer: OfflineSigner,
        options: SigningStargateClientOptions = {},
    ): Promise<DataOceanSigningStargateClient> {
        const tmClient = await Tendermint34Client.connect(endpoint)
        return new DataOceanSigningStargateClient(tmClient, signer, {
            registry: createDefaultRegistry() as Registry,
            ...options,
        })
    }

    protected constructor(
        tmClient: Tendermint34Client | undefined,
        signer: OfflineSigner,
        options: SigningStargateClientOptions,
    ) {
        super(tmClient, signer, options)
        if (tmClient) {
            this.dataoceanQueryClient = QueryClient.withExtensions(tmClient, setupDataOceanExtension)
        }
    }

    public async createVideo(
        creator: string,
        title: string,
        description: string,
        coverLink: string,
        videoLink: string,
        priceMB: Long,
        fee: StdFee | "auto" | number,
        memo = "",
    ): Promise<DeliverTxResponse> {
        const msg: MsgCreateVideoEncodeObject = {
            typeUrl: typeUrlMsgCreateVideo,
            value: {
                creator: creator,
                title: title,
                description: description,
                coverLink: coverLink,
                videoLink: videoLink,
                priceMB: priceMB,
            },
        }
        return this.signAndBroadcast(creator, [msg], fee, memo)
    }

    public async playVideo(
        creator: string,
        videoId: Long,
        fee: StdFee | "auto" | number,
        memo = "",
    ): Promise<DeliverTxResponse> {
        const msg: MsgPlayVideoEncodeObject = {
            typeUrl: typeUrlMsgPlayVideo,
            value: {
                creator: creator,
                videoId: videoId,
            },
        }
        return this.signAndBroadcast(creator, [msg], fee, memo)
    }

    public async paySign(
        creator: string,
        videoId: Long,
        payPublicKey: string,
        fee: StdFee,
        memo = "",
    ): Promise<TxRaw> {
        const msg: MsgPaySignEncodeObject = {
            typeUrl: typeUrlMsgPaySign,
            value: {
                creator: creator,
                videoId: videoId,
                payPublicKey: payPublicKey,
            },
        }
        return this.sign(creator, [msg], fee, memo)
    }

    public async signPlayVideo(
        creator: string,
        videoId: Long,
        fee: StdFee,
        memo = "",
    ): Promise<TxRaw> {
        const msg: MsgPlayVideoEncodeObject = {
            typeUrl: typeUrlMsgPlayVideo,
            value: {
                creator: creator,
                videoId: videoId,
            },
        }
        return this.sign(creator, [msg], fee, memo)
    }

    public async authzGrantSend(
        granter: string,
        grantee: string,
        fee: StdFee | "auto" | number,
        memo = "",
    ): Promise<DeliverTxResponse> {
        const msg = MsgGrant.fromPartial({
            granter: granter,
            grantee: grantee,
            grant: {
                authorization: {
                    typeUrl: "/cosmos.bank.v1beta1.SendAuthorization",
                    value: SendAuthorizationProto.encode(
                        { spendLimit: [{ denom: "token", amount: "1000" }] }
                    ).finish(),
                },
                expiration: {
                    seconds: Math.ceil(new Date().getTime() / 1000) + 3600 * 2,
                    nanos: 0,
                }
            },
        });
        const msgAny: EncodeObject = {
            typeUrl: "/cosmos.authz.v1beta1.MsgGrant",
            value: msg,
        };

        return this.signAndBroadcast(granter, [msgAny], fee, memo);
    }
}