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
import Long from "long"
import { DataOceanExtension, setupDataOceanExtension } from "./modules/dataocean/queries"
import {
    dataoceanTypes,
    MsgCreateVideoEncodeObject,
    typeUrlMsgCreateVideo,
} from "./types/dataocean/messages"

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
        const createMsg: MsgCreateVideoEncodeObject = {
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
        return this.signAndBroadcast(creator, [createMsg], fee, memo)
    }

    public async signCreateVideo(
        creator: string,
        title: string,
        description: string,
        coverLink: string,
        videoLink: string,
        priceMB: Long,
        fee: StdFee,
        memo = "",
    ): Promise<TxRaw> {
        const createMsg: MsgCreateVideoEncodeObject = {
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
        return this.sign(creator, [createMsg], fee, memo)
    }
}