import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function BrowseKeyTuning(props) {
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
    <ul className="BrowseKeyTuning">
      {loading ? (
        <>
          {Array(8)
            .fill()
            .map((item, index) => (
              <SkeletonTheme key={index} color="#282828" highlightColor="#444">
                <Skeleton
                  width={
                    props.id === "tuning"
                      ? `${randInt(20, 30)}%`
                      : `${randInt(10, 50)}%`
                  }
                  height={35}
                />
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
