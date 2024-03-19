import "./styles.css";
import { Skeleton } from "@chakra-ui/react";
import { usePokemonContext } from "../../hooks/usePokemonContext";
import { Pokemon } from "../../interface/interfaces";

interface PokemonListProps {
  onOpen: () => void;
}

function PokemonList({ onOpen }: PokemonListProps) {
  const { setPokemon, isLoading, pokemonList, totalPokemons } = usePokemonContext();

  function handlePokemonClick(pokemon: Pokemon) {
    setPokemon(pokemon);
    onOpen();
  }

  return (
    <div className="pokemon-list">
      {isLoading &&
        Array.from({ length: totalPokemons }).map((_, index) => (
          <Skeleton key={index} height="110px" borderRadius=".5rem" />
        ))}
      {pokemonList.map((pokemon) => (
        <div
          className="pokemon-card"
          key={pokemon.id}
          onClick={() => handlePokemonClick(pokemon)}
        >
          <div className="number">
            <p>#{pokemon.id}</p>
          </div>
          <img
            src={pokemon.img}
            alt={pokemon.name}
          />
          <div className="name">
            <p>{pokemon.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PokemonList;