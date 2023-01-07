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


    public async authzGrantSend(
        granter: string,
        grantee: string,
        fee: StdFee | "auto" | number,
    ): Promise<DeliverTxResponse> {
        const msg = MsgGrant.fromPartial({
            granter: granter,
            grantee: grantee,
            grant: {
                authorization: {
                    // "@type": "/cosmos.authz.v1beta1.GenericAuthorization",
                    // "msg": "/cosmos.bank.v1beta1.MsgSend"
                    typeUrl: "/cosmos.bank.v1beta1.SendAuthorization",
                    value: SendAuthorizationProto.encode(
                        { spendLimit: [{ denom: "token", amount: "10" }] }
                    ).finish(),
                },
                expiration: {
                    seconds: Math.ceil(new Date().getTime() / 1000) + 3600 * 2,
                    nanos: 0,
                }
            },

            // grant = {
            //     authorization: {
            //         type_url: "/cosmos.bank.v1beta1.SendAuthorization",
            //         value: SendAuthorizationProto.encode(
            //             this.params.authorization,
            //         ).finish(),
            //     },
            //     expiration,
            // };

        });
        const msgAny: EncodeObject = {
            typeUrl: "/cosmos.authz.v1beta1.MsgGrant",
            value: msg,
        };

        return this.signAndBroadcast(granter, [msgAny], fee);

        // let grantee = "hid1k77resf8gktl5wh8fhwlqt7pccandeyj9z5702"  // account with no money
        // let customTypeUrl = "/hypersignprotocol.hidnode.ssi.MsgCreateDID"

        // // The Custom Module Message that the grantee needs to execute
        // const txCreateDIDMessage = {
        //     typeUrl: customTypeUrl,
        //     value: MsgCreateDID.encode(
        //         MsgCreateDID.fromPartial({
        //             didDocString: "---",
        //             signatures: "---",
        //             creator: "---",
        //         })).finish(),
        // };

        // MsgExec Tx Object
        // const txAuthMessage = {
        //     typeUrl: "/cosmos.authz.v1beta1.MsgGrant",
        //     value: {
        //         "granter": granter,
        //         "grantee": grantee,
        //         "grant": {
        //             "authorization": {
        //                 "@type": "/cosmos.authz.v1beta1.GenericAuthorization",
        //                 "msg": "/cosmos.bank.v1beta1.MsgSend"
        //             },
        //             "expiration": "2023-01-07T09:38:11Z"
        //         }
        //     },
        // };

        // return this.signAndBroadcast(grantee, [txAuthMessage], fee);

    }
}