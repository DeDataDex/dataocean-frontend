declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_DATA_OCEAN_RPC_URL: string
            MNEMONIC_TEST_ALICE: string
            ADDRESS_TEST_ALICE: string
            MNEMONIC_TEST_BOB: string
            ADDRESS_TEST_BOB: string
            FAUCET_URL: string
        }
    }
}

export { }
