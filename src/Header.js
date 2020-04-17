import React from "react";
import MdSearch from "react-ionicons/lib/MdSearch";
import MdHome from "react-ionicons/lib/MdHome";

export default function Header(props) {
  return (
    <div className="Header">
      {props.title === "SLIPPERY PLAYER" ? (
        <MdSearch
          className="icons"
          fontSize="1.5rem"
          color="#ffffff"
          onClick={() => props.handleShowSearchBox(true)}
        />
      ) : (
        <MdHome
          className="icons"
          fontSize="1.5rem"
          color="#ffffff"
          onClick={() => props.handleGoHome(true)}
        />
      )}

      <div className="title">{props.title}</div>

      <div className="icons" />
    </div>
  );
}
