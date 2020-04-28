import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function BrowseTuneArtist(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const randInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  return (
    <ul className="BrowseTuneArtist">
      {loading ? (
        <>
          {Array(12)
            .fill()
            .map((item, index) => (
              <SkeletonTheme key={index} color="#282828" highlightColor="#444">
                <Skeleton width={`${randInt(20, 70)}%`} height={25} />
              </SkeletonTheme>
            ))}
        </>
      ) : (
        <>
          {props.filteredList.map(
            filter =>
              filter && (
                <li
                  id={props.id}
                  key={filter.id}
                  onClick={props.handleSearchClick}
                >
                  {filter}
                </li>
              )
          )}
        </>
      )}
    </ul>
  );
}
