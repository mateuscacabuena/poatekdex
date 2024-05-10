import "./styles.css";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Search } from "../Icon/Search";
import { Sort } from "../Icon/Sort";
import { usePokemonContext } from "../../../hooks/usePokemonContext";
import { TrainerPokemon } from "../../../interface/interfaces";
import { useEffect, useState } from "react";
import { useTrainerContext } from "../../../hooks/useTrainerContext";

interface SearchBarProps {
  onOpen: () => void;
}

function SearchBar({ onOpen }: SearchBarProps) {
  const { setPokemon, getPokemon } = usePokemonContext();
  const { trainer, setCatchedPokemons, catchedPokemons } = useTrainerContext();
  const [selectList, setSelectList] = useState<TrainerPokemon[]>([]);
  const [searchText, setSearchText] = useState("");

  function handleSearch() {
    if (searchText === "") {
      setSelectList([]);
      return;
    }

    const searchedList = [...trainer.pokemons]
      .filter((TrainerPokemon: TrainerPokemon) => {
        return TrainerPokemon.name.toLowerCase().startsWith(searchText.toLowerCase());
      })
      .slice(0, 7);
    setSelectList(searchedList);
  }

  async function handleSelect(TrainerPokemon: TrainerPokemon) {
    const pokemon = await getPokemon(TrainerPokemon.id);
    setSearchText("");
    setPokemon(pokemon);
    onOpen();
  }

  function handleFilter(option: Number) {
    if (!trainer) return;
    let sortedList = [...catchedPokemons];

    switch (option) {
      case 1:
        sortedList.sort((a: TrainerPokemon, b: TrainerPokemon) => a.id - b.id);
        break;
      case 2:
        sortedList.sort((a: TrainerPokemon, b: TrainerPokemon) => b.id - a.id);
        break;
      case 3:
        sortedList.sort((a: TrainerPokemon, b: TrainerPokemon) =>
          a.name.localeCompare(b.name)
        );
        break;
      case 4:
        sortedList.sort((a: TrainerPokemon, b: TrainerPokemon) =>
          b.name.localeCompare(a.name)
        );
        break;
      default:
        console.log("Invalid option");
    }
    setCatchedPokemons(sortedList);
  }

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  return (
    <div className="search-bar">
      <div className="search">
        <InputGroup color={"#1d1d1d"}>
          <InputLeftElement pointerEvents="none">
            <Search boxSize={"1.2rem"} />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search"
            _focus={{
              boxShadow: "0px 1px 3px 1px #00000033",
              transition: "box-shadow 0.3s ease",
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
          <div className="select">
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
      <div className="filter">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<Sort boxSize={"1.2rem"} />}
            borderRadius={"2rem"}
            variant={"outline"}
            _hover={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 1px 3px 1px #00000033",
              transition: "box-shadow 0.3s ease",
            }}
          />
          <MenuList color={"#DC0A2D"} zIndex={2}>
            <MenuItem onClick={() => handleFilter(1)}>Lowest Number</MenuItem>
            <MenuItem onClick={() => handleFilter(2)}>Highest Number</MenuItem>
            <MenuItem onClick={() => handleFilter(3)}>A-Z</MenuItem>
            <MenuItem onClick={() => handleFilter(4)}>Z-A</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default SearchBar;
