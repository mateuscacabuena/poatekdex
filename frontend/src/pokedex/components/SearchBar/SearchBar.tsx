import "./styles.css";
import { TrainerPokemon } from "../../../interface/interfaces";
import { useTrainerContext } from "../../../hooks/useTrainerContext";
import SearchInput from "./components/Search/SearchInput";
import FilterButton from "./components/Filter/FilterButton";
import { usePokemonContext } from "../../../hooks/usePokemonContext";

interface SearchBarProps {
  onOpen: () => void;
}

function SearchBar({ onOpen }: SearchBarProps) {
  const { trainer, setCatchedPokemons, catchedPokemons } = useTrainerContext();
  const { setPokemon, getPokemon } = usePokemonContext();

  async function handleSelect(TrainerPokemon: TrainerPokemon) {
    const pokemon = await getPokemon(TrainerPokemon.id);
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
        break;
    }
    setCatchedPokemons(sortedList);
  }

  return (
    <div className="Search-bar">
      <SearchInput handleSelect={handleSelect} />
      <FilterButton handleFilter={handleFilter} />
    </div>
  );
}

export default SearchBar;