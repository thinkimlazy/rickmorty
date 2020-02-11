import React, { useState } from "react";
import { Character } from "./data";

interface Props {
  chars: Character[];
  addCharacterToParty: (c: Character) => any;
}

export default function CharList({ chars, addCharacterToParty }: Props) {
  const [removedCharactersId, setRemovedCharactersId] = useState<string[]>([]);

  const displayedCharacters = chars.filter(
    ({ id }) => !removedCharactersId.includes(id)
  );

  return (
    <div className="search-result">
      {displayedCharacters.map((character: Character) => {
        const { name, image, id } = character;
        return (
          <div className="search-item" key={id}>
            <div
              className="delete"
              onClick={() => {
                setRemovedCharactersId(removedCharactersId.concat(id));
              }}
            >
              <i className="fa fa-times "></i>
            </div>
            <img
              src={image}
              className="image"
              onClick={() => addCharacterToParty(character)}
            />
          </div>
        );
      })}
    </div>
  );
}
