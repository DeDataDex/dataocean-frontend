import React, { useEffect, RefObject } from 'react';
import { useDispatch } from 'react-redux';
import Hls from 'hls.js';
import store from '@/Videos/store';
import JSEncrypt from 'jsencrypt'

export interface HlsPlayerProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {
  hlsConfig?: any;
  playerRef?: RefObject<HTMLVideoElement>;
  src: string;
  paySign: string;
  payPrivateKey: string;
  payPublicKey: string;
  accountAddress: string;
}

function ReactHlsPlayer({
  hlsConfig,
  playerRef = React.createRef<HTMLVideoElement>(),
  src,
  paySign,
  payPrivateKey,
  payPublicKey,
  accountAddress = '',
  ...props
}: HlsPlayerProps) {
  const dispatch = useDispatch();
  const controls = !!accountAddress
  const autoPlay = !!accountAddress

  useEffect(() => {
    let hls: Hls;

    function _initPlayer() {
      if (hls != null) {
        hls.destroy();
      }

      const newHls = new Hls({
        debug: true,
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 60 * 1.5,
        ...hlsConfig,
      });

      if (playerRef.current != null) {
        newHls.attachMedia(playerRef.current);
      }

      newHls.on(Hls.Events.MEDIA_ATTACHED, () => {
        controls && newHls.loadSource(src);

        newHls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (autoPlay) {
            playerRef?.current
              ?.play()
              .catch(() =>
                console.log(
                  'Unable to autoplay prior to user interaction with the dom.'
                )
              );
          }
        });
      });

      newHls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              newHls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              newHls.recoverMediaError();
              break;
            default:
              _initPlayer();
              break;
          }
        }
      });

      newHls.on(Hls.Events.FRAG_BUFFERED, function (event, data) {
        const payDataOrigin =  {
          receivedSizeMB: data.stats.total,
          timestamp: Math.ceil(new Date().getTime() / 1000),
        }
        
        console.log({payDataOrigin})
        const encryptor = new JSEncrypt()  
        encryptor.setPublicKey(payPublicKey)
        const payData = encryptor.encrypt(JSON.stringify(payDataOrigin))
        // console.log({payData})
        encryptor.setPrivateKey(payPrivateKey)
        const uncrypted = payData && encryptor.decrypt(payData)
        // console.log({uncrypted})

        const payload = {creator: accountAddress, paySign, payData}
        dispatch(
          store.actions.playVideoNotify(payload)
        );
      });


      hls = newHls;
    }

    // Check for Media Source support
    if (Hls.isSupported()) {
      _initPlayer();
    }

    return () => {
      if (hls != null) {
        hls.destroy();
      }
    };
  }, [autoPlay, controls, accountAddress, hlsConfig, playerRef, src, dispatch]);

  // If Media Source is supported, use HLS.js to play video
  if (Hls.isSupported()) return <video controls={controls} ref={playerRef} {...props} />;

  // Fallback to using a regular video player if HLS is supported by default in the user's browser
  return <video ref={playerRef} src={src} autoPlay={autoPlay} {...props} />;
}

export default ReactHlsPlayer;