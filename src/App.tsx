import React, { useState, ChangeEvent, ChangeEventHandler } from "react";
import { gql } from "apollo-boost";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { throttle } from "lodash";

import CharList from "./CharList";
import { Character } from "./data";
import "./App.css";

const GET_CARDS = gql`
  query getpics($name: String!) {
    characters(page: 1, filter: { name: $name }) {
      info {
        pages
      }
      results {
        id
        name
        image
      }
    }
  }
`;

const RICK_NAME = "Rick";
const MORTY_NAME = "Morty";

const App = () => {
  const [searchName, setSearchName] = useState("");

  const [getData, { loading, data, error }] = useLazyQuery(GET_CARDS, {
    variables: { name: searchName }
  });
  const throttledGetData = throttle(getData, 300, { trailing: true });
  const onChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value }
  }) => {
    setSearchName(value);
    if (value.length > 2) {
      throttledGetData();
    }
  };

  const [rick, setRick] = useState<Character>();
  const [morty, setMorty] = useState<Character>();

  function addCharacterToParty(char: Character) {
    if (char.name.includes(RICK_NAME)) {
      setRick(char);
    } else if (char.name.includes(MORTY_NAME)) {
      setMorty(char);
    }
  }

  // const displayedCharacters = data.characters.results.filter(({id}: any) => !removedCharactersId.includes(id))

  return (
    <div className="App">
      <input className="input" onChange={onChange} />
      {data && data.characters.results && (
        <CharList
          chars={data.characters.results}
          addCharacterToParty={addCharacterToParty}
        />
      )}

      <div>
        <div className="party-title">
          <b>PARTY</b>
        </div>
        <div className="selected">
          {rick ? (
            <img className="image" src={rick.image}></img>
          ) : (
            <div className="empty-party-char">Rick</div>
          )}
          {morty ? (
            <img className="image" src={morty.image}></img>
          ) : (
            <div className="empty-party-char">Morty</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
