/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { Params } from "./params";
import { Video } from "./video";
import { VideoLink } from "./video_link";

export const protobufPackage = "dataocean.dataocean";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params?: Params;
}

export interface QueryGetVideoRequest {
  id: Long;
}

export interface QueryGetVideoResponse {
  Video?: Video;
}

export interface QueryAllVideoRequest {
  pagination?: PageRequest;
}

export interface QueryAllVideoResponse {
  Video: Video[];
  pagination?: PageResponse;
}

export interface QueryGetVideoLinkRequest {
  index: string;
}

export interface QueryGetVideoLinkResponse {
  videoLink?: VideoLink;
}

export interface QueryAllVideoLinkRequest {
  pagination?: PageRequest;
}

export interface QueryAllVideoLinkResponse {
  videoLink: VideoLink[];
  pagination?: PageResponse;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryGetVideoRequest(): QueryGetVideoRequest {
  return { id: Long.UZERO };
}

export const QueryGetVideoRequest = {
  encode(message: QueryGetVideoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetVideoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetVideoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetVideoRequest {
    return { id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO };
  },

  toJSON(message: QueryGetVideoRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetVideoRequest>, I>>(object: I): QueryGetVideoRequest {
    const message = createBaseQueryGetVideoRequest();
    message.id = (object.id !== undefined && object.id !== null) ? Long.fromValue(object.id) : Long.UZERO;
    return message;
  },
};

function createBaseQueryGetVideoResponse(): QueryGetVideoResponse {
  return { Video: undefined };
}

export const QueryGetVideoResponse = {
  encode(message: QueryGetVideoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Video !== undefined) {
      Video.encode(message.Video, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetVideoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetVideoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Video = Video.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetVideoResponse {
    return { Video: isSet(object.Video) ? Video.fromJSON(object.Video) : undefined };
  },

  toJSON(message: QueryGetVideoResponse): unknown {
    const obj: any = {};
    message.Video !== undefined && (obj.Video = message.Video ? Video.toJSON(message.Video) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetVideoResponse>, I>>(object: I): QueryGetVideoResponse {
    const message = createBaseQueryGetVideoResponse();
    message.Video = (object.Video !== undefined && object.Video !== null) ? Video.fromPartial(object.Video) : undefined;
    return message;
  },
};

function createBaseQueryAllVideoRequest(): QueryAllVideoRequest {
  return { pagination: undefined };
}

export const QueryAllVideoRequest = {
  encode(message: QueryAllVideoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllVideoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllVideoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllVideoRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllVideoRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllVideoRequest>, I>>(object: I): QueryAllVideoRequest {
    const message = createBaseQueryAllVideoRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllVideoResponse(): QueryAllVideoResponse {
  return { Video: [], pagination: undefined };
}

export const QueryAllVideoResponse = {
  encode(message: QueryAllVideoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Video) {
      Video.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllVideoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllVideoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Video.push(Video.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllVideoResponse {
    return {
      Video: Array.isArray(object?.Video) ? object.Video.map((e: any) => Video.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllVideoResponse): unknown {
    const obj: any = {};
    if (message.Video) {
      obj.Video = message.Video.map((e) => e ? Video.toJSON(e) : undefined);
    } else {
      obj.Video = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllVideoResponse>, I>>(object: I): QueryAllVideoResponse {
    const message = createBaseQueryAllVideoResponse();
    message.Video = object.Video?.map((e) => Video.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetVideoLinkRequest(): QueryGetVideoLinkRequest {
  return { index: "" };
}

export const QueryGetVideoLinkRequest = {
  encode(message: QueryGetVideoLinkRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetVideoLinkRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetVideoLinkRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetVideoLinkRequest {
    return { index: isSet(object.index) ? String(object.index) : "" };
  },

  toJSON(message: QueryGetVideoLinkRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetVideoLinkRequest>, I>>(object: I): QueryGetVideoLinkRequest {
    const message = createBaseQueryGetVideoLinkRequest();
    message.index = object.index ?? "";
    return message;
  },
};

function createBaseQueryGetVideoLinkResponse(): QueryGetVideoLinkResponse {
  return { videoLink: undefined };
}

export const QueryGetVideoLinkResponse = {
  encode(message: QueryGetVideoLinkResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.videoLink !== undefined) {
      VideoLink.encode(message.videoLink, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetVideoLinkResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetVideoLinkResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.videoLink = VideoLink.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetVideoLinkResponse {
    return { videoLink: isSet(object.videoLink) ? VideoLink.fromJSON(object.videoLink) : undefined };
  },

  toJSON(message: QueryGetVideoLinkResponse): unknown {
    const obj: any = {};
    message.videoLink !== undefined &&
      (obj.videoLink = message.videoLink ? VideoLink.toJSON(message.videoLink) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetVideoLinkResponse>, I>>(object: I): QueryGetVideoLinkResponse {
    const message = createBaseQueryGetVideoLinkResponse();
    message.videoLink = (object.videoLink !== undefined && object.videoLink !== null)
      ? VideoLink.fromPartial(object.videoLink)
      : undefined;
    return message;
  },
};

function createBaseQueryAllVideoLinkRequest(): QueryAllVideoLinkRequest {
  return { pagination: undefined };
}

export const QueryAllVideoLinkRequest = {
  encode(message: QueryAllVideoLinkRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllVideoLinkRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllVideoLinkRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllVideoLinkRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllVideoLinkRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllVideoLinkRequest>, I>>(object: I): QueryAllVideoLinkRequest {
    const message = createBaseQueryAllVideoLinkRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllVideoLinkResponse(): QueryAllVideoLinkResponse {
  return { videoLink: [], pagination: undefined };
}

export const QueryAllVideoLinkResponse = {
  encode(message: QueryAllVideoLinkResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.videoLink) {
      VideoLink.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllVideoLinkResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllVideoLinkResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.videoLink.push(VideoLink.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllVideoLinkResponse {
    return {
      videoLink: Array.isArray(object?.videoLink) ? object.videoLink.map((e: any) => VideoLink.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllVideoLinkResponse): unknown {
    const obj: any = {};
    if (message.videoLink) {
      obj.videoLink = message.videoLink.map((e) => e ? VideoLink.toJSON(e) : undefined);
    } else {
      obj.videoLink = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllVideoLinkResponse>, I>>(object: I): QueryAllVideoLinkResponse {
    const message = createBaseQueryAllVideoLinkResponse();
    message.videoLink = object.videoLink?.map((e) => VideoLink.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a Video by id. */
  Video(request: QueryGetVideoRequest): Promise<QueryGetVideoResponse>;
  /** Queries a list of Video items. */
  VideoAll(request: QueryAllVideoRequest): Promise<QueryAllVideoResponse>;
  /** Queries a VideoLink by index. */
  VideoLink(request: QueryGetVideoLinkRequest): Promise<QueryGetVideoLinkResponse>;
  /** Queries a list of VideoLink items. */
  VideoLinkAll(request: QueryAllVideoLinkRequest): Promise<QueryAllVideoLinkResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "dataocean.dataocean.Query";
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Video = this.Video.bind(this);
    this.VideoAll = this.VideoAll.bind(this);
    this.VideoLink = this.VideoLink.bind(this);
    this.VideoLinkAll = this.VideoLinkAll.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  Video(request: QueryGetVideoRequest): Promise<QueryGetVideoResponse> {
    const data = QueryGetVideoRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Video", data);
    return promise.then((data) => QueryGetVideoResponse.decode(new _m0.Reader(data)));
  }

  VideoAll(request: QueryAllVideoRequest): Promise<QueryAllVideoResponse> {
    const data = QueryAllVideoRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "VideoAll", data);
    return promise.then((data) => QueryAllVideoResponse.decode(new _m0.Reader(data)));
  }

  VideoLink(request: QueryGetVideoLinkRequest): Promise<QueryGetVideoLinkResponse> {
    const data = QueryGetVideoLinkRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "VideoLink", data);
    return promise.then((data) => QueryGetVideoLinkResponse.decode(new _m0.Reader(data)));
  }

  VideoLinkAll(request: QueryAllVideoLinkRequest): Promise<QueryAllVideoLinkResponse> {
    const data = QueryAllVideoLinkRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "VideoLinkAll", data);
    return promise.then((data) => QueryAllVideoLinkResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
