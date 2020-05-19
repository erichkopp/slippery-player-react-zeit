import React from "react";
import MdSearch from "react-ionicons/lib/MdSearch";
import MdHome from "react-ionicons/lib/MdHome";
import donate from "../images/donate.png";

export default function Header(props) {
  return (
    <div className="Header">
      {props.title === "SLIPPERY PLAYER" ? (
        <MdSearch
          className="icons search-icon"
          fontSize="1.5rem"
          color="#ffffff"
          onClick={() => props.handleShowSearchBox(true)}
        />
      ) : (
        <MdHome
          className="icons home-icon"
          fontSize="1.5rem"
          color="#ffffff"
          onClick={() => props.handleGoHome(true)}
        />
      )}

      <div className="title">{props.title}</div>

      <div className="icons">
        <form className="paypal-form" target="blank" rel="noopener noreferrer" action="https://www.paypal.com/cgi-bin/webscr" method="post">
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="AQYRL66C8H8SJ" />
          <input type="image" src={donate} className="donate-button" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
          <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
        </form>
      </div>

    </div>
  );
}
