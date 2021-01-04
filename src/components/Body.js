import React, { useState, useEffect } from "react";
import SearchHomeMenu from "./SearchHomeMenu";
import BrowseTuneArtist from "./BrowseTuneArtist";
import BrowseKeyTuning from "./BrowseKeyTuning";
import BrowseCollection from "./BrowseCollection";
import SearchResults from "./SearchResults";

export default function Body(props) {
  const [showSearchHome, setShowSearchHome] = useState(true);

  const [showTunes, setShowTunes] = useState(false);
  const [showArtists, setShowArtists] = useState(false);
  const [showKeys, setShowKeys] = useState(false);
  const [showTunings, setShowTunings] = useState(false);
  const [showCollections, setShowCollections] = useState(false);

  const [showBrowseResults, setShowBrowseResults] = useState(false);
  const [showSearchBoxResults, setShowSearchBoxResults] = useState(false);

  const [searchKey, setSearchKey] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [searchBoxResults, setSearchBoxResults] = useState();

  const [searchBoxValue, setSearchBoxValue] = useState();



  const tunes = props.allTunes.map(tune => tune["tune_name"]);
  const filterTunes = tunes
    .filter((tune, index) => tunes.indexOf(tune) === index)
    .sort();

  const artists = props.allTunes.map(tune => tune["played_by"]);
  const filterArtists = artists
    .filter((tune, index) => artists.indexOf(tune) === index)
    .sort();

  const keys = props.allTunes.map(tune => tune["key"]);
  const filterKeys = keys
    .filter((tune, index) => keys.indexOf(tune) === index)
    .sort();

  const tunings = props.allTunes.map(tune => tune["tuning"]);
  const filterTunings = tunings
    .filter((tune, index) => tunings.indexOf(tune) === index)
    .sort();

  const collections = props.allTunes.map(tune => tune["collections"]);
  const filterCollections = collections
    .filter((tune, index) => collections.indexOf(tune) === index)
    .sort();


  const tunesList = 
    searchKey === "collections"
      ? props.allTunes.filter(tune => tune["collections"].includes(searchQuery))
        .sort((a, b) => a["tune_name"].localeCompare(b["tune_name"]))
      : props.allTunes.filter(tune => tune[searchKey] === searchQuery)
        .sort((a, b) => a["tune_name"].localeCompare(b["tune_name"]))
    

  const showHome = () => {
    setShowSearchHome(true);
    props.handleTitleChange("SLIPPERY PLAYER");

    setShowTunes(false);
    setShowArtists(false);
    setShowKeys(false);
    setShowTunings(false);
    setShowBrowseResults(false);
    setShowSearchBoxResults(false);
    setShowCollections(false);
  };


  useEffect(() => {
    props.goHome && showHome();
  });


  const findSearchBoxResults = () => {
    let searchArray = [];
    setSearchBoxResults();
    for (let i = 0; i < props.allTunes.length; i++) {
      if (
        props.allTunes[i]["tune_name"]
          .toUpperCase()
          .includes(searchBoxValue.toUpperCase())
      ) {
        searchArray.push(props.allTunes[i]);
      }
      if (
        props.allTunes[i]["played_by"] &&
        props.allTunes[i]["played_by"]
          .toUpperCase()
          .includes(searchBoxValue.toUpperCase())
      ) {
        !searchArray.includes(props.allTunes[i]) &&
          searchArray.push(props.allTunes[i]);
      }
      for (let j = 0; j < props.allTunes[i]["collections"].length; j++) {
        if (
          props.allTunes[i]["collections"][j]
            .toUpperCase()
            .includes(searchBoxValue.toUpperCase())
        ) {
          !searchArray.includes(props.allTunes[i]) &&
            searchArray.push(props.allTunes[i])
        }
      }
    }
    setSearchBoxResults(searchArray);
    setSearchBoxValue();
  };


  const handleSearchBoxSubmit = e => {
    e.preventDefault();

    props.handleShowSearchBox(false);
    props.handleGoHome(false);
    setShowSearchHome(false);
    setShowSearchBoxResults(true);
    props.handleTitleChange(searchBoxValue.toUpperCase());

    findSearchBoxResults();
  };


  const handleEnterSubmit = e => {
    if (e.keyCode === 13) {
      setSearchBoxValue(e.target.value);
      console.log(e.target.value);
    }
  };


  const handleBrowseClick = e => {
    props.handleGoHome(false);
    const link = e.target.id;

    if (link === "tune_name") {
      setShowSearchHome(false);
      setShowTunes(true);
      props.handleTitleChange("BROWSE TUNES");
    }
    if (link === "played_by") {
      setShowSearchHome(false);
      setShowArtists(true);
      props.handleTitleChange("BROWSE ARTISTS");
    }
    if (link === "key") {
      setShowSearchHome(false);
      setShowKeys(true);
      props.handleTitleChange("BROWSE KEYS");
    }
    if (link === "tuning") {
      setShowSearchHome(false);
      setShowTunings(true);
      props.handleTitleChange("BROWSE TUNINGS");
    }
    if (link === "collection") {
      setShowSearchHome(false);
      setShowCollections(true);
      props.handleTitleChange("BROWSE COLLECTIONS");
    }
  };


  const handleSearchClick = e => {
    const key = e.target.id;
    const query = e.target.innerText;
    // console.log(key)
    // console.log(query)

    props.handleTitleChange(query);
    setSearchKey(key);
    setSearchQuery(query);
    setShowBrowseResults(true);
    setShowTunes(false);
    setShowArtists(false);
    setShowKeys(false);
    setShowTunings(false);
    setShowCollections(false);
  };


  const handleTuneClick = (list, index) => {
    props.handleTuneClick(list, index);
  };
  

  return (
    <div className="Body">

      {/* SEARCH BOX */}
      {props.showSearchBox && (
        <form onSubmit={handleSearchBoxSubmit}>
          <input
            placeholder="Search..."
            id="search-box"
            type="text"
            onKeyDown={handleEnterSubmit}
          />
        </form>
      )}

      <div
        className="search-options"
        onClick={() => props.handleShowSearchBox(false)}
      >
        {/* SEARCH HOME MENU */}
        {showSearchHome && (
          <SearchHomeMenu handleBrowseClick={handleBrowseClick} />
        )}

        {/* SEARCH TUNE MENU */}
        {showTunes && (
          <BrowseTuneArtist
            id="tune_name"
            filteredList={filterTunes}
            handleSearchClick={handleSearchClick}
          />
        )}

        {/* SEARCH ARTIST MENU */}
        {showArtists && (
          <BrowseTuneArtist
            id="played_by"
            filteredList={filterArtists}
            handleSearchClick={handleSearchClick}
          />
        )}

        {/* SEARCH KEY MENU */}
        {showKeys && (
          <BrowseKeyTuning
            id="key"
            filteredList={filterKeys}
            handleSearchClick={handleSearchClick}
          />
        )}

        {/* SEARCH TUNINGS MENU */}
        {showTunings && (
          <BrowseKeyTuning
            id="tuning"
            filteredList={filterTunings}
            handleSearchClick={handleSearchClick}
          />
        )}

        {/* SEARCH COLLECTION MENU */}
        {showCollections && (
          <BrowseCollection
            id="collections"
            filteredList={filterCollections}
            handleSearchClick={handleSearchClick}
          />
        )}
      </div>

      {/* SEARCH RESULTS FROM BROWSE QUERIES */}
      {showBrowseResults && (
        <SearchResults
          searchResults={tunesList}
          handleTuneClick={handleTuneClick}
          currentMp3Link={props.currentMp3Link}
        />
      )}

      {/* SEARCH RESULTS FROM SEARCH BOX */}
      {showSearchBoxResults && searchBoxResults && (
        <SearchResults
          searchResults={searchBoxResults}
          handleTuneClick={handleTuneClick}
          currentMp3Link={props.currentMp3Link}
        />
      )}
    </div>
  );
}
