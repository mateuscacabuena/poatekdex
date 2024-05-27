import "./styles.css";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Search } from "../../../Icon/Search";
import { TrainerPokemon } from "../../../../../interface/interfaces";
import { useEffect, useState } from "react";
import { useTrainerContext } from "../../../../../hooks/useTrainerContext";

interface SearchInputProps {
  handleSelect: (TrainerPokemon: TrainerPokemon) => void;
}

function SearchInput({ handleSelect }: SearchInputProps) {
  const { trainer } = useTrainerContext();
  const [selectList, setSelectList] = useState<TrainerPokemon[]>([]);
  const [searchText, setSearchText] = useState("");

  function handleSearch() {
    if (searchText === "") {
      setSelectList([]);
      return;
    }

    const searchedList = [...trainer.pokemons]
      .filter((TrainerPokemon: TrainerPokemon) => {
        return TrainerPokemon.name
          .toLowerCase()
          .startsWith(searchText.toLowerCase());
      })
      .slice(0, 7);
    setSelectList(searchedList);
  }

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  return (
    <div className="Search-input">
      <InputGroup color={"#1d1d1d"}>
        <InputLeftElement pointerEvents="none">
          <Search boxSize={"1.2rem"} />
        </InputLeftElement>
        <Input
          name="search"
          data-cy="search"
          type="text"
          placeholder="Search"
          transition={"0.3s ease"}
          _focus={{
            boxShadow: "0px 1px 3px 1px #00000033",
          }}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onBlur={() => {
            setTimeout(() => {
              setSearchText("");
            }, 300);
          }}
        />
      </InputGroup>
      {selectList.length > 0 ? (
        <div className="select" data-cy="select-list">
          {selectList.map((TrainerPokemon) => (
            <p
              className="item"
              key={TrainerPokemon.id}
              onClick={() => {
                handleSelect(TrainerPokemon);
              }}
            >
              {TrainerPokemon.name}
            </p>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SearchInput;
