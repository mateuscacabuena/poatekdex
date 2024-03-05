import { useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { usePokemonContext } from "../../hooks/usePokemonContext";
import { Pokemon } from "../../interface/interfaces";

function PokemonList() {
  const navigate = useNavigate();
  const { setPokemon, isLoading, pokemonList } = usePokemonContext();

  function handlePokemonClick(pokemon: Pokemon) {
    const obj = {
      abilities: pokemon.abilities,
      description: "descricao",
      height: pokemon.height / 10,
      id: pokemon.id,
      name: pokemon.name,
      stats: pokemon.stats,
      types: pokemon.types,
      weight: pokemon.weight / 10,
    };
    setPokemon(obj);
    navigate("/" + pokemon.name);
  }

  function showPokemons() {
    return (
      <>
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
      </>
    );
  }

  useEffect(() => {
    showPokemons();
  }, [pokemonList]);

  return (
    <div className="pokemon-list">
      {isLoading && (
        <div className="loading">
          <Spinner color="red" size={"xl"} />
        </div>
      )}
      {showPokemons()}
    </div>
  );
}

export default PokemonList;
