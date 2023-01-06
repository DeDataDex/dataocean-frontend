## Set Environment Variables

```
export REACT_APP_DATA_OCEAN_CHAIN_ID="dataocean"
export REACT_APP_DATA_OCEAN_RPC_URL=http://127.0.0.1:26657
export REACT_APP_DATA_OCEAN_REST_URL=http://127.0.0.1:1317
export REACT_APP_DATA_OCEAN_ADMIN_ADDRESS=cosmos...,cosmos...
```

`REACT_APP_DATA_OCEAN_ADMIN_ADDRESS` is the address that can uplaod videos.

## How to run

> check for updates first if needed
>
> `$git clone git@github.com:DeDataDex/dataocean-frontend.git`\
> `$cd dataocean-frontend`\
> `$yarn`

`$yarn start`

Runs the app in the development mode.\
Open [http://localhost:3005](http://localhost:3005) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## How to test

`$yarn test`

Launches the test runner in the interactive watch mode.

## How to test deploying

Build the app for production to the `build` folder:

`$yarn build`

Your app is ready to be deployed!

You may want to serve it locally with a static server for test before deploying:

```
npm install -g serve
serve -s build
```

Then visit: [http://localhost:5000](http://localhost:5000)

A github action will be triggered and deploy the newest version.
