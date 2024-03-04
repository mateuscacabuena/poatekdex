import { useEffect, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

/*
  fazer responsividade
  fazer useContext
  limpar comentários no fim deste código
*/

function PokemonList() {
  const navigate = useNavigate();
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function handlePokemonClick(pokemon: any) {
    navigate("/" + pokemon.name);
  }

  const fetchPokemons = async () => {
    const promises = [];
    for (let i = 1; i <= 151; i++) {
      promises.push(
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((response) =>
          response.json()
        )
      );
    }

    const pokemons = await Promise.all(promises);
    setPokemonList(pokemons);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPokemons();
    //console.log(pokemonList);
  }, []);

  return (
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
  );
}

export default PokemonList;

// console.log(pokemon.name, pokemon.id, pokemon.height, pokemon.weight, pokemon.types, pokemon.stats)

{
  /* <div className="pokemon-card" onClick={handlePokemonClick}>
        <div className="number">
          <p>#001</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="bulbasaur"
        />
        <div className="name">
          <p>bulbasaur</p>
        </div>
      </div> */
}
