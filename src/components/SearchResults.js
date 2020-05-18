import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function SearchResults(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  },[])

  const randInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  return (
    <div className="search-results">
      {loading ? (
        // LOADING SKELETON SCREEN
        <>
          {Array(6)
            .fill()
            .map((item, index) => (
              <SkeletonTheme key={index} color="#282828" highlightColor="#444">
                <Skeleton width={`${randInt(40, 80)}%`} height={25} />
                <br />
                <Skeleton width={`${randInt(30, 60)}%`} height={15} />
              </SkeletonTheme>
            ))}
        </>
      ) : (
        // SEARCH RESULTS
        <ul>
          {props.searchResults.map((tune, index) => (
            <li
              onClick={() => props.handleTuneClick(props.searchResults, index)}
              id={index}
              key={tune.id}
            >
              <div id={index} className="tune-name">
                {tune["tune_name"]}
              </div>

              <div id={index}>{tune["played_by"] && tune["played_by"]}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
