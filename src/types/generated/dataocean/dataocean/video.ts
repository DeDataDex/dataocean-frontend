/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dataocean.dataocean";

export interface Video {
  id: Long;
  creator: string;
  title: string;
  description: string;
  coverLink: string;
  videoLink: string;
  priceMB: Long;
  createdAt: Long;
}

function createBaseVideo(): Video {
  return {
    id: Long.UZERO,
    creator: "",
    title: "",
    description: "",
    coverLink: "",
    videoLink: "",
    priceMB: Long.UZERO,
    createdAt: Long.UZERO,
  };
}

export const Video = {
  encode(message: Video, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.coverLink !== "") {
      writer.uint32(42).string(message.coverLink);
    }
    if (message.videoLink !== "") {
      writer.uint32(50).string(message.videoLink);
    }
    if (!message.priceMB.isZero()) {
      writer.uint32(56).uint64(message.priceMB);
    }
    if (!message.createdAt.isZero()) {
      writer.uint32(64).uint64(message.createdAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Video {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVideo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.title = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        case 5:
          message.coverLink = reader.string();
          break;
        case 6:
          message.videoLink = reader.string();
          break;
        case 7:
          message.priceMB = reader.uint64() as Long;
          break;
        case 8:
          message.createdAt = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Video {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      creator: isSet(object.creator) ? String(object.creator) : "",
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      coverLink: isSet(object.coverLink) ? String(object.coverLink) : "",
      videoLink: isSet(object.videoLink) ? String(object.videoLink) : "",
      priceMB: isSet(object.priceMB) ? Long.fromValue(object.priceMB) : Long.UZERO,
      createdAt: isSet(object.createdAt) ? Long.fromValue(object.createdAt) : Long.UZERO,
    };
  },

  toJSON(message: Video): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.coverLink !== undefined && (obj.coverLink = message.coverLink);
    message.videoLink !== undefined && (obj.videoLink = message.videoLink);
    message.priceMB !== undefined && (obj.priceMB = (message.priceMB || Long.UZERO).toString());
    message.createdAt !== undefined && (obj.createdAt = (message.createdAt || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Video>, I>>(object: I): Video {
    const message = createBaseVideo();
    message.id = (object.id !== undefined && object.id !== null) ? Long.fromValue(object.id) : Long.UZERO;
    message.creator = object.creator ?? "";
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.coverLink = object.coverLink ?? "";
    message.videoLink = object.videoLink ?? "";
    message.priceMB = (object.priceMB !== undefined && object.priceMB !== null)
      ? Long.fromValue(object.priceMB)
      : Long.UZERO;
    message.createdAt = (object.createdAt !== undefined && object.createdAt !== null)
      ? Long.fromValue(object.createdAt)
      : Long.UZERO;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
