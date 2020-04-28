import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="LoadingSpinner">
      <div className="loader">
        <div />
        <div />
        <div />
      </div>

      <div className="loading-subtitle">
        <p>Slippery-Hill</p>
        <p>Web Player</p>
      </div>
    </div>
  );
}
