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
import { usePokemonContext } from "../../hooks/usePokemonContext";
import { Pokemon } from "../../interface/interfaces";

function SearchBar() {
  const { pokemonList, setPokemonList } = usePokemonContext();

  function handleFilter(option: Number) {
    switch (option) {
      case 1:
        if (pokemonList) {
          const sortedList = [...pokemonList].sort((a: Pokemon, b: Pokemon) => {
            return a.id - b.id;
          });
          setPokemonList(sortedList);
        }
        break;
      case 2:
        if (pokemonList) {
          const sortedList = [...pokemonList].sort((a: Pokemon, b: Pokemon) => {
            return b.id - a.id;
          });
          setPokemonList(sortedList);
        }
        break;
      case 3:
        if (pokemonList) {
          const sortedList = [...pokemonList].sort((a: Pokemon, b: Pokemon) => {
            return a.name.localeCompare(b.name);
          });
          setPokemonList(sortedList);
        }
        break;
      case 4:
        if (pokemonList) {
          const sortedList = [...pokemonList].sort((a: Pokemon, b: Pokemon) => {
            return b.name.localeCompare(a.name);
          });
          setPokemonList(sortedList);
        }
        break;
      default:
        console.log("Invalid option");
    }
  }

  return (
    <div className="search-bar">
      <InputGroup color={"#1d1d1d"}>
        <InputLeftElement pointerEvents="none">
          <Search boxSize={"1.2rem"} />
        </InputLeftElement>
        <Input
          type="tel"
          placeholder="Search"
          _focus={{
            boxShadow: "0px 1px 3px 1px #00000033",
            transition: "box-shadow 0.3s ease",
          }}
        />
      </InputGroup>
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
