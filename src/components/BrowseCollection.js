import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function BrowseCollection(props) {
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


  // GET ONLY UNIQUE ENTRIES. NO DUPLICATES
  const collectionsList = []
  for (let i = 0; i < props.filteredList.length; i++) {
    if (props.filteredList[i] !== undefined && !collectionsList.includes(props.filteredList[i][0])) {
      collectionsList.push(props.filteredList[i][0]);
    }
  }


  return (
    <ul className="BrowseTuneArtistCollection">
      {loading ? (
        // LOADING SKELETON SCREEN
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
        // BROWSE RESULTS
        <>
          {collectionsList.map(
            filter =>
              filter && filter !== "none" && (
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
