import React, { useState } from "react";
import Header from "./Header";
import Body from "./Body";
import Player from "./Player";
// import Fullscreen from "react-full-screen";
import "./styles.css";

const allTunes = require("./allTunes.json");

export default function App() {
  // const [isFullScreen, setIsFullScreen] = useState();

  const [showSearchBox, setShowSearchBox] = useState(false);
  const [title, setTitle] = useState();
  const [goHome, setGoHome] = useState(true);

  const [playList, setPlayList] = useState();
  const [tuneIndex, setTuneIndex] = useState();

  const handleTitleChange = page => {
    setTitle(page);
  };

  const handleGoHome = bool => {
    setGoHome(bool);
  };

  const handleTuneClick = (tunesList, index) => {
    setPlayList(tunesList);
    setTuneIndex(index);
  };

  const handleShowSearchBox = bool => {
    setShowSearchBox(bool);
  };

  return (
    <div className="main">
      {/* <Fullscreen enabled={isFullScreen}> */}
      <Header
        title={title}
        handleGoHome={handleGoHome}
        handleShowSearchBox={handleShowSearchBox}
      />

      <Body
        allTunes={allTunes}
        handleTuneClick={handleTuneClick}
        handleTitleChange={handleTitleChange}
        handleGoHome={handleGoHome}
        goHome={goHome}
        showSearchBox={showSearchBox}
        handleShowSearchBox={handleShowSearchBox}
      />

      <Player
        playList={playList}
        tuneIndex={tuneIndex}
        handleShowSearchBox={handleShowSearchBox}
      />

      {/* </Fullscreen> */}
    </div>
  );
}
