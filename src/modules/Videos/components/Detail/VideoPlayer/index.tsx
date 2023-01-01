import React, {useEffect, RefObject} from "react"
import ReactHlsPlayer from 'react-hls-player'


export interface VideoPlayerProps {
  src: string;
}

/**
 * Docs https://github.com/devcshort/react-hls#README
 * @param src
 * @constructor
 */
const VideoPlayer: React.FC<VideoPlayerProps> = ({src}) => {
  const playerRef = React.useRef<HTMLVideoElement | undefined>(undefined);

  useEffect(() => {
    if (playerRef.current) {
     // TypesScript doesn't recognize `play` here. Not sure how to control playback or configure for repeat on playback complete. 
      playerRef.current.play();
    }
  }, [])

  return (
    <ReactHlsPlayer
          src={src}
          autoPlay={true}
          controls={true}
          width="100%"
          height="auto" 
          playerRef={playerRef as RefObject<HTMLVideoElement>}        
        />
  );
}

export default VideoPlayer;