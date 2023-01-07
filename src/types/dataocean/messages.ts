import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing"
import {
    MsgCreateVideo,
    MsgCreateVideoResponse,
    MsgPlayVideo,
    MsgPlayVideoResponse,
    MsgSubmitPaySign,
    MsgPaySign,
} from "../generated/dataocean/dataocean/tx"

export const typeUrlMsgCreateVideo = "/dataocean.dataocean.MsgCreateVideo"
export const typeUrlMsgPlayVideo = "/dataocean.dataocean.MsgPlayVideo"
export const typeUrlMsgSubmitPaySign = "/dataocean.dataocean.MsgSubmitPaySign"
export const typeUrlMsgPaySign = "/dataocean.dataocean.MsgPaySign"

export const dataoceanTypes: ReadonlyArray<[string, GeneratedType]> = [
    [typeUrlMsgCreateVideo, MsgCreateVideo],
    [typeUrlMsgPlayVideo, MsgPlayVideo],
    [typeUrlMsgSubmitPaySign, MsgSubmitPaySign],
    [typeUrlMsgPaySign, MsgPaySign],
]


export interface MsgSubmitPaySignEncodeObject extends EncodeObject {
    readonly typeUrl: "/dataocean.dataocean.MsgSubmitPaySign"
    readonly value: Partial<MsgSubmitPaySign>
}

export function isMsgSubmitPaySignEncodeObject(
    encodeObject: EncodeObject,
): encodeObject is MsgSubmitPaySignEncodeObject {
    return (encodeObject as MsgSubmitPaySignEncodeObject).typeUrl === typeUrlMsgSubmitPaySign
}
export interface MsgPaySignEncodeObject extends EncodeObject {
    readonly typeUrl: "/dataocean.dataocean.MsgPaySign"
    readonly value: Partial<MsgPaySign>
}

export function isMsgPaySignEncodeObject(
    encodeObject: EncodeObject,
): encodeObject is MsgPaySignEncodeObject {
    return (encodeObject as MsgPaySignEncodeObject).typeUrl === typeUrlMsgPaySign
}

export interface MsgCreateVideoEncodeObject extends EncodeObject {
    readonly typeUrl: "/dataocean.dataocean.MsgCreateVideo"
    readonly value: Partial<MsgCreateVideo>
}

export interface MsgCreateVideoResponseEncodeObject extends EncodeObject {
    readonly typeUrl: "/dataocean.dataocean.MsgCreateVideoResponse"
    readonly value: Partial<MsgCreateVideoResponse>
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

