import React, {useState, useRef} from 'react';
import "video-react/dist/video-react.css";
import { 
    Player,
    ControlBar,
    ReplayControl,
    ForwardControl,
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton,
    VolumeMenuButton
 } from 'video-react';
export default (props) => {
    const [player,setPlayer] = useState();

    // console.log("player", player);
  return (
    <Player ref={(player) => setPlayer(player)}  autoPlay={false}  >
       <source src={props?.videoSrc} onContextMenu={() => {return false}} />
      <ControlBar>
        <ReplayControl seconds={10} order={1.1} />
        <ForwardControl seconds={10} order={1.2} />
        <CurrentTimeDisplay order={4.1} />
        <TimeDivider order={4.2} />
        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
        <VolumeMenuButton disabled />
      </ControlBar>
    </Player>
  );
};