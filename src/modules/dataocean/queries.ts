import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate"
import Long from "long"
import {
    QueryClientImpl,
    QueryAllVideoResponse,
} from "../../types/generated/dataocean/dataocean/query"

import { Video } from "../../types/generated/dataocean/dataocean/video"
import { PageResponse } from "../../types/generated/cosmos/base/query/v1beta1/pagination"


export interface AllVideoResponse {
    videos: Video[]
    pagination?: PageResponse
}

export interface DataOceanExtension {
    readonly dataocean: {
        readonly getAllVideos: (
            key: Uint8Array,
            offset: Long,
            limit: Long,
            countTotal: boolean,
        ) => Promise<AllVideoResponse>
    }
}


export function setupDataOceanExtension(base: QueryClient): DataOceanExtension {
    const rpc = createProtobufRpcClient(base)
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const queryService = new QueryClientImpl(rpc)

    return {
        dataocean: {
            getAllVideos: async (
                key: Uint8Array,
                offset: Long,
                limit: Long,
                countTotal: boolean,
            ): Promise<AllVideoResponse> => {
                const response: QueryAllVideoResponse = await queryService.VideoAll({
                    pagination: {
                        key: key,
                        offset: offset,
                        limit: limit,
                        countTotal: countTotal,
                        reverse: false,
                    },
                })
                return {
                    videos: response.Video,
                    pagination: response.pagination,
                }
            },
        },
    }
}
