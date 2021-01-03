import React from "react";

export default function SearchHomeMenu(props) {
  return (
    <ul className="search-home">
      <li id="browse-by">BROWSE BY:</li>

      <li id="tune_name" onClick={props.handleBrowseClick}>
        TUNE
      </li>

      <li id="played_by" onClick={props.handleBrowseClick}>
        ARTIST
      </li>

      <li id="key" onClick={props.handleBrowseClick}>
        KEY
      </li>

      <li id="tuning" onClick={props.handleBrowseClick}>
        TUNING
      </li>

      <li id="collection" onClick={props.handleBrowseClick}>
        COLLECTION
      </li>
    </ul>
  );
}
