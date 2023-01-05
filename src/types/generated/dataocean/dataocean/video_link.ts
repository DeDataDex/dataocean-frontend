/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dataocean.dataocean";

export interface VideoLink {
  index: string;
  url: string;
  exp: Long;
}

function createBaseVideoLink(): VideoLink {
  return { index: "", url: "", exp: Long.UZERO };
}

export const VideoLink = {
  encode(message: VideoLink, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (!message.exp.isZero()) {
      writer.uint32(24).uint64(message.exp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VideoLink {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVideoLink();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        case 2:
          message.url = reader.string();
          break;
        case 3:
          message.exp = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VideoLink {
    return {
      index: isSet(object.index) ? String(object.index) : "",
      url: isSet(object.url) ? String(object.url) : "",
      exp: isSet(object.exp) ? Long.fromValue(object.exp) : Long.UZERO,
    };
  },

  toJSON(message: VideoLink): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.url !== undefined && (obj.url = message.url);
    message.exp !== undefined && (obj.exp = (message.exp || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VideoLink>, I>>(object: I): VideoLink {
    const message = createBaseVideoLink();
    message.index = object.index ?? "";
    message.url = object.url ?? "";
    message.exp = (object.exp !== undefined && object.exp !== null) ? Long.fromValue(object.exp) : Long.UZERO;
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
