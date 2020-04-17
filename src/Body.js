import React, { useState, useEffect } from "react";

export default function Body(props) {
  const [showSearchHome, setShowSearchHome] = useState(true);

  const [showTunes, setShowTunes] = useState(false);
  const [showArtists, setShowArtists] = useState(false);
  const [showKeys, setShowKeys] = useState(false);
  const [showTunings, setShowTunings] = useState(false);

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

  const tunesList = props.allTunes
    .filter(tune => tune[searchKey] === searchQuery)
    .sort((a, b) => a["tune_name"].localeCompare(b["tune_name"]));

  const showHome = () => {
    setShowSearchHome(true);
    props.handleTitleChange("SLIPPERY PLAYER");

    setShowTunes(false);
    setShowArtists(false);
    setShowKeys(false);
    setShowTunings(false);
    setShowBrowseResults(false);
    setShowSearchBoxResults(false);
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
    }
    setSearchBoxResults(searchArray);
    setSearchBoxValue();
  };

  const handleSearchBoxSubmit = e => {
    e.preventDefault();

    props.handleShowSearchBox(false);
    props.handleGoHome(false);

    findSearchBoxResults();

    setShowSearchHome(false);
    setShowSearchBoxResults(true);
    props.handleTitleChange(searchBoxValue.toUpperCase());
  };

  const handleEnterSubmit = e => {
    if (e.keyCode === 13) {
      setSearchBoxValue(e.target.value);
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
  };

  const handleSearchClick = e => {
    const key = e.target.id;
    const query = e.target.innerText;

    props.handleTitleChange(query);
    setSearchKey(key);
    setSearchQuery(query);
    setShowBrowseResults(true);
    setShowTunes(false);
    setShowArtists(false);
    setShowKeys(false);
    setShowTunings(false);
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
            id="search-box"
            type="text"
            placeholder="Search..."
            // defaultValue={searchBoxValue}
            // onBlur={e => setSearchBoxValue(e.target.value)}
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
          <ul className="search-home">
            <li id="browse-by">BROWSE BY:</li>
            <li id="tune_name" onClick={handleBrowseClick}>
              TUNE
            </li>
            <li id="played_by" onClick={handleBrowseClick}>
              ARTIST
            </li>
            <li id="key" onClick={handleBrowseClick}>
              KEY
            </li>
            <li id="tuning" onClick={handleBrowseClick}>
              TUNING
            </li>
          </ul>
        )}
        {/* SEARCH TUNE MENU */}
        {showTunes && (
          <ul className="search-tune">
            {filterTunes.map(tune => (
              <li id="tune_name" key={tune.id} onClick={handleSearchClick}>
                {tune}
              </li>
            ))}
            {/* <li>END</li> */}
          </ul>
        )}
        {/* SEARCH ARTIST MENU */}
        {showArtists && (
          <ul className="search-artist">
            {filterArtists.map(
              artist =>
                artist && (
                  <li
                    id="played_by"
                    key={artist.id}
                    onClick={handleSearchClick}
                  >
                    {artist}
                  </li>
                )
            )}
            {/* <li>END</li> */}
          </ul>
        )}
        {/* SEARCH KEY MENU */}
        {showKeys && (
          <ul className="search-key">
            {filterKeys.map(
              key =>
                key && (
                  <li id="key" key={key.id} onClick={handleSearchClick}>
                    {key}
                  </li>
                )
            )}
            {/* <li>END</li> */}
          </ul>
        )}
        {/* SEARCH TUNINGS MENU */}
        {showTunings && (
          <ul className="search-tuning">
            {filterTunings.map(
              tuning =>
                tuning && (
                  <li id="tuning" key={tuning.id} onClick={handleSearchClick}>
                    {tuning}
                  </li>
                )
            )}
            {/* <li>END</li> */}
          </ul>
        )}
      </div>

      {/* SEARCH RESULTS FROM BROWSE QUERIES */}
      {showBrowseResults && (
        <div className="search-results">
          <ul>
            {tunesList.map((filteredTune, index) => (
              <li
                onClick={() => handleTuneClick(tunesList, index)}
                id={index}
                key={filteredTune.id}
              >
                <div id={index} className="tune-name">
                  {filteredTune["tune_name"]}
                </div>
                <div id={index}>
                  {filteredTune["played_by"] && filteredTune["played_by"]}
                </div>
              </li>
            ))}
            {/* <li>END</li> */}
          </ul>
        </div>
      )}

      {/* SEARCH RESULTS FROM SEARCH BOX */}
      {showSearchBoxResults && searchBoxResults && (
        <div className="search-results">
          <ul>
            {searchBoxResults.map((tune, index) => (
              <li
                onClick={() => handleTuneClick(searchBoxResults, index)}
                id={index}
                key={tune.id}
              >
                <div id={index} className="tune-name">
                  {tune["tune_name"]}
                </div>
                <div id={index}>{tune["played_by"] && tune["played_by"]}</div>
              </li>
            ))}
            {/* <li>END</li> */}
          </ul>
        </div>
      )}
    </div>
  );
}
