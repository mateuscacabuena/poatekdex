import "./styles.css";
import { Spinner } from "@chakra-ui/react";
import { usePokemonContext } from "../../hooks/usePokemonContext";
import { Pokemon } from "../../interface/interfaces";

interface Props {
  onOpen: () => void;
}

function PokemonList( { onOpen }: Props) {
  const { setPokemon, isLoading, pokemonList } = usePokemonContext();

  function handlePokemonClick(pokemon: Pokemon) {
    setPokemon(pokemon);
    onOpen();
  }

  return (
    <>
      <div className="pokemon-list">
        {isLoading && (
          <div className="loading">
            <Spinner color="red" size={"xl"} />
          </div>
        )}
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
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={pokemon.name}
            />
            <div className="name">
              <p>{pokemon.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PokemonList;
