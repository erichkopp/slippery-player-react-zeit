import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import MdPlay from "react-ionicons/lib/MdPlay";
import MdPause from "react-ionicons/lib/MdPause";
import MdRepeat from "react-ionicons/lib/MdRepeat";
// import MdShuffle from "react-ionicons/lib/MdShuffle";
import Labels from "./Labels";

const Player = React.memo(function Player(props) {
  const [playlist, setPlaylist] = useState();
  const [tuneIndex, setTuneIndex] = useState();
  const [repeat, setRepeat] = useState(false);
  // const [shuffle, setShuffle] = useState(false);

  const playIcon = (
    <MdPlay className="play-pause-button" fontSize="45px" color="#ffffff" />
  );
  const pauseIcon = (
    <MdPause className="play-pause-button" fontSize="45px" color="#ffffff" />
  );
  const repeatIcon = (
    <MdRepeat
      onClick={() => setRepeat(!repeat)}
      fontSize="26px"
      color={repeat ? "#ffffff" : "#515151"}
    />
  );
  // const shuffleIcon = (
  //   <MdShuffle
  //     onClick={() => setShuffle(!shuffle)}
  //     className="shuffle-button"
  //     fontSize="24px"
  //     color={shuffle ? "#ffffff" : "#515151"}
  //   />
  // );

  useEffect(() => {
    setPlaylist(props.playList);
    setTuneIndex(props.tuneIndex);
  }, [props.playList, props.tuneIndex]);

  const handlePlayNext = () => {
    tuneIndex < playlist.length - 1 && setTuneIndex(tuneIndex + 1);
  };

  const handleClickPrevious = () => {
    tuneIndex > 0 && setTuneIndex(tuneIndex - 1);
  };

  const handleClickNext = () => {
    playlist && tuneIndex < playlist.length - 1 && setTuneIndex(tuneIndex + 1);
  };

  return (
    <div className="Player" onClick={() => props.handleShowSearchBox(false)}>
      {playlist && (
        <ul className="now-playing">
          <li>
            {playlist[tuneIndex]["tune_name"] &&
              playlist[tuneIndex]["tune_name"].toUpperCase()}
          </li>
          <li>
            {playlist[tuneIndex]["played_by"]
              ? playlist[tuneIndex]["played_by"].toUpperCase()
              : "-"}
          </li>
          <li>{playlist[tuneIndex]["key"]
            ? playlist[tuneIndex]["key"]
            : "-"}
            </li>
          <li>
            {playlist[tuneIndex]["tuning"]
              ? playlist[tuneIndex]["tuning"]
              : "-"}
          </li>
        </ul>
      )}

      <Labels />

      <AudioPlayer
        layout="stacked-reverse"
        autoPlay
        autoPlayAfterSrcChange={true}
        showSkipControls={true}
        showJumpControls={false}
        src={playlist && playlist[tuneIndex]["mp3_link"]}
        onEnded={handlePlayNext}
        onClickPrevious={handleClickPrevious}
        onClickNext={handleClickNext}
        customIcons={{
          play: playIcon,
          pause: pauseIcon,
          loop: repeatIcon,
          loopOff: repeatIcon
        }}
      />
      {/* {shuffleIcon} */}
    </div>
  );
});

export default Player;
