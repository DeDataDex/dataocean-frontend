import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing"
import {
    MsgCreateVideo,
    MsgCreateVideoResponse,
    MsgPlayVideo,
    MsgPlayVideoResponse,
} from "../generated/dataocean/dataocean/tx"

export const typeUrlMsgCreateVideo = "/dataocean.dataocean.MsgCreateVideo"
export const typeUrlMsgCreateVideoResponse = "/dataocean.dataocean.MsgCreateVideoResponse"
export const typeUrlMsgPlayVideo = "/dataocean.dataocean.MsgPlayVideo"
export const typeUrlMsgPlayVideoResponse = "/dataocean.dataocean.MsgPlayVideoResponse"

export const dataoceanTypes: ReadonlyArray<[string, GeneratedType]> = [
    [typeUrlMsgCreateVideo, MsgCreateVideo],
    [typeUrlMsgPlayVideo, MsgPlayVideo],
]

export interface MsgCreateVideoEncodeObject extends EncodeObject {
    readonly typeUrl: "/dataocean.dataocean.MsgCreateVideo"
    readonly value: Partial<MsgCreateVideo>
}

export function isMsgCreateVideoEncodeObject(
    encodeObject: EncodeObject,
): encodeObject is MsgCreateVideoEncodeObject {
    return (encodeObject as MsgCreateVideoEncodeObject).typeUrl === typeUrlMsgCreateVideo
}

export interface MsgCreateVideoResponseEncodeObject extends EncodeObject {
    readonly typeUrl: "/dataocean.dataocean.MsgCreateVideoResponse"
    readonly value: Partial<MsgCreateVideoResponse>
}

export function isMsgCreateVideoResponseEncodeObject(
    encodeObject: EncodeObject,
): encodeObject is MsgCreateVideoResponseEncodeObject {
    return (encodeObject as MsgCreateVideoResponseEncodeObject).typeUrl === typeUrlMsgCreateVideoResponse
}

export interface MsgPlayVideoEncodeObject extends EncodeObject {
    readonly typeUrl: "/dataocean.dataocean.MsgPlayVideo"
    readonly value: Partial<MsgPlayVideo>
}

export function isMsgPlayVideoEncodeObject(
    encodeObject: EncodeObject,
): encodeObject is MsgPlayVideoEncodeObject {
    return (encodeObject as MsgPlayVideoEncodeObject).typeUrl === typeUrlMsgPlayVideo
}

export interface MsgPlayVideoResponseEncodeObject extends EncodeObject {
    readonly typeUrl: "/dataocean.dataocean.MsgPlayVideoResponse"
    readonly value: Partial<MsgPlayVideoResponse>
}

export function isMsgPlayVideoResponseEncodeObject(
    encodeObject: EncodeObject,
): encodeObject is MsgPlayVideoResponseEncodeObject {
    return (encodeObject as MsgPlayVideoResponseEncodeObject).typeUrl === typeUrlMsgPlayVideoResponse
}
