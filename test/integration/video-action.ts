// import { toHex } from "@cosmjs/encoding"
import { OfflineDirectSigner } from "@cosmjs/proto-signing"
import { Account, DeliverTxResponse, GasPrice } from "@cosmjs/stargate"
// import { Log } from "@cosmjs/stargate/build/logs"
// import { BroadcastTxSyncResponse } from "@cosmjs/tendermint-rpc"
import { expect } from "chai"
// import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx"
import { config } from "dotenv"
// import Long from "long"
import _ from "../../environment"
import { DataOceanSigningStargateClient } from "../../src/dataocean_signingstargateclient"
import { DataOceanExtension } from "../../src/modules/dataocean/queries"
// import {
//     getCapturedPos,
//     getCreatedGameId,
//     getCreateGameEvent,
//     getMovePlayedEvent,
//     getWinner,
// } from "../../src/types/dataocean/events"
// import { typeUrlMsgPlayMove } from "../../src/types/dataocean/messages"
// import { completeGame, GameMove, GamePiece, Player } from "../../src/types/dataocean/player"
// import { StoredGame } from "../../src/types/generated/dataocean/stored_game"
// import { askFaucet } from "../../src/util/faucet"
import { getSignerFromMnemonic } from "../../src/utils/signer"
// import { CheckersStargateClient } from "../../src/checkers_stargateclient"

config()

describe("Video Actions Test", function () {
    const { REACT_APP_DATA_OCEAN_RPC_URL: RPC_URL, ADDRESS_TEST_ALICE: alice, ADDRESS_TEST_BOB: bob } = process.env
    let aliceSigner: OfflineDirectSigner, bobSigner: OfflineDirectSigner

    before("create signers", async function () {
        aliceSigner = await getSignerFromMnemonic(process.env.MNEMONIC_TEST_ALICE)
        bobSigner = await getSignerFromMnemonic(process.env.MNEMONIC_TEST_BOB)
        expect((await aliceSigner.getAccounts())[0].address).to.equal(alice)
        expect((await bobSigner.getAccounts())[0].address).to.equal(bob)

    })

    // let aliceClient: DataOceanSigningStargateClient,
    //     bobClient: DataOceanSigningStargateClient,
    //     dataocean: DataOceanExtension["dataocean"]

    // before("create signing clients", async function () {
    //     aliceClient = await DataOceanSigningStargateClient.connectWithSigner(RPC_URL, aliceSigner, {
    //         gasPrice: GasPrice.fromString("0token"),
    //     })
    //     bobClient = await DataOceanSigningStargateClient.connectWithSigner(RPC_URL, bobSigner, {
    //         gasPrice: GasPrice.fromString("0token"),
    //     })
    //     dataocean = aliceClient.dataoceanQueryClient!.dataocean
    // })

    it("empty test", async function () {
    })
})
