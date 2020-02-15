import React, { useState, useEffect } from "react";

import "./CharPicker.css";

export default ({ onCharSelect, selectedChar, side }) => {
  const [loadedChars, setLoadedChars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://swapi.co/api/people")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then(charData => {
        setIsLoading(false);
        const selectedCharacters = charData.results.slice(0, 5);
        setLoadedChars(
          selectedCharacters.map((char, index) => ({
            name: char.name,
            id: index + 1
          }))
        );
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  let content = <p>Loading characters...</p>;

  if (!isLoading && loadedChars && loadedChars.length > 0) {
    content = (
      <select onChange={onCharSelect} value={selectedChar} className={side}>
        {loadedChars.map(char => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    );
  } else if (!isLoading && (!loadedChars || loadedChars.length === 0)) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};
