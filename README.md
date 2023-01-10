## Prepare videos data on local chain

```
dataoceand tx dataocean create-video 台湾往事 蒋雯丽华表奖最佳女主获奖影片 0efe9b9e21b96ee879c1a74c666bac4c4c46792e.jpg@672w_378h_1c_web-home-common-cover.avif https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8 10 --from alice --generate-only > unsign.json -y
dataoceand tx dataocean create-video 过年 赵丽蓉、葛优主演贺岁片 b7928b44fce7aa60b1ff2edf6282fc0c643f9a12.png@672w_378h_1c_web-home-common-cover.avif https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8 10 --from alice --generate-only > unsign.json -y
dataoceand tx dataocean create-video 刺杀肯尼迪 豆瓣8.8政治惊悚片 cf495fa58aabab2e1c1f7e6d7aee4772e2252ab2.png@672w_378h_1c_web-home-common-cover.avif https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8 10 --from alice --generate-only > unsign.json -y
dataoceand tx dataocean create-video 重金属囧途 豆瓣7.7，北欧人幽默起来连自己都怕 28f0752715f65a1237f0a706e93a183cd50b234a.jpg@672w_378h_1c_web-home-common-cover.webp https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8 10 --from alice --generate-only > unsign.json -y
dataoceand tx dataocean create-video 精灵旅社4：变身大冒险 全网首播！十年经典欢乐完结 cefaeb5df3842d0d3d71c621c620d61377b4680a.jpg@672w_378h_1c_web-home-common-cover.avif https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8 10 --from alice --generate-only > unsign.json -y
dataoceand tx dataocean create-video 大雄兔 "大雄兔是Blender基金會第2部開放授權、創作共享的動畫電影，代號Peach。片長10分鐘，Big Buck Bunny全部使用開放原始碼軟體製作，彩現的計算機叢集使用昇陽電腦公司的Sun Grid亦是開放原始碼的 製作技術和素材徹底公開。不同於上一個專案Elephants Dream，本篇全程無語音" bigbuckbunny.jpg https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8 10 --from alice --generate-only > unsign.json -y

dataoceand tx sign unsign.json --from alice > sign.json
dataoceand tx encode sign.json > tx.txt
cat tx.txt

curl -X POST \
    -H "content-Type: application/json" \
    -d'{"tx_bytes":"Co0ECooECiMvZGF0YW9jZWFuLmRhdGFvY2Vhbi5Nc2dDcmVhdGVWaWRlbxLiAwotY29zbW9zMXl1ZzB0MmdjaG14eG0weXV3eXhkeHJ0Z3lsNHl6ZTc4OHhtdGV4EgnlpKfpm4TlhZQa3gLlpKfpm4TlhZTmmK9CbGVuZGVy5Z+66YeR5pyD56ysMumDqOmWi+aUvuaOiOasiuOAgeWJteS9nOWFseS6q+eahOWLleeVq+mbu+W9se+8jOS7o+iZn1BlYWNo44CC54mH6ZW3MTDliIbpkJjvvIxCaWcgQnVjayBCdW5ueeWFqOmDqOS9v+eUqOmWi+aUvuWOn+Wni+eivOi7n+mrlOijveS9nO+8jOW9qeePvueahOioiOeul+apn+WPoumbhuS9v+eUqOaYh+mZvembu+iFpuWFrOWPuOeahFN1biBHcmlk5Lqm5piv6ZaL5pS+5Y6f5aeL56K855qEIOijveS9nOaKgOihk+WSjOe0oOadkOW+ueW6leWFrOmWi+OAguS4jeWQjOaWvOS4iuS4gOWAi+WwiOahiEVsZXBoYW50cyBEcmVhbe+8jOacrOevh+WFqOeoi+eEoeiqnumfsyIQYmlnYnVja2J1bm55LmpwZyoxaHR0cHM6Ly90ZXN0LXN0cmVhbXMubXV4LmRldi94MzZ4aHp6L3gzNnhoenoubTN1ODAKElgKUApGCh8vY29zbW9zLmNyeXB0by5zZWNwMjU2azEuUHViS2V5EiMKIQMKq9Gpru2asfNtTC27xCToiJnsTL2PAmOm7XU6ms9abxIECgIIARgGEgQQwJoMGkANdikUU2ueifLNoXgQYD69Dawg7uCW56emm9TVMKmPEwJwklaKWAeJu+k0/nRwRMM2YsVxo6zp+dTQiwIS5JFS","mode":"BROADCAST_MODE_SYNC"}' \
    http://localhost:1317/cosmos/tx/v1beta1/txs

dataoceand query tx F910A798D138F661A958D8772078A757067D9035525FF6406D87FE89B3081F59

curl -X GET -H  "accept: application/json" http://localhost:1317/dataocean/dataocean/video

curl -X GET -H  "accept: application/json" http://localhost:1317/dataocean/dataocean/video/0
```

## Set Environment Variables

cp .env-demo .env

replace admin accounts(who can upload videos) in `REACT_APP_DATA_OCEAN_ADMIN_ADDRESS`

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
