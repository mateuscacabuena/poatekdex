import "./styles.css";
import { Skeleton } from "@chakra-ui/react";
import { usePokemonContext } from "../../hooks/usePokemonContext";
import { PokemonTrainer } from "../../../interface/interfaces";
import { idFormater } from "../../utils/utils";

interface PokemonListProps {
  onOpen: () => void;
}

function PokemonList({ onOpen }: PokemonListProps) {
  const { isLoading, totalPokemons, trainer, pokemonCard } = usePokemonContext();

  const trainerPokemonArray: (PokemonTrainer | null)[] = Array.from(
    { length: totalPokemons },
    () => null
  );

  trainer.pokemons.map((pokemon) => {
    trainerPokemonArray[pokemon.id - 1] = pokemon;
  });

  function handlePokemonClick(id: number) {
    pokemonCard(id)
    onOpen();
  }
  
  function renderPokemonCard(pokemon: PokemonTrainer | null, index: number) {
    if (pokemon) {
      return (
        <div
          className="pokemon-card"
          key={pokemon.id}
          onClick={() => handlePokemonClick(pokemon.id)}
        >
          <div className="number">
            <p>#{idFormater(pokemon.id)}</p>
          </div>
          <img src={pokemon.imageUrl} alt={pokemon.name} />
          <div className="name">
            <p>{pokemon.name}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="pokemon-card"
          key={index + 1}
          onClick={() => console.log("catch")}
        >
          <div className="number">
            <p>#{idFormater(index + 1)}</p>
          </div>
          <img src={"https://cdn-icons-png.flaticon.com/512/5726/5726624.png"} alt={'unknown'} />
          <div className="name">
            <p>Unknown</p>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="pokemon-list">
      {isLoading &&
        Array.from({ length: totalPokemons }).map((_, index) => (
          <Skeleton key={index} height="110px" borderRadius=".5rem" />
        ))}
      {trainerPokemonArray.map(renderPokemonCard)}
    </div>
  );
}

export default PokemonList;