import "./styles.css";
import { Skeleton, useDisclosure } from "@chakra-ui/react";
import { usePokemonContext } from "../../hooks/usePokemonContext";
import { Pokemon } from "../../interface/interfaces";
import PokemonScreen from "../PokemonScreen/PokemonScreen";

function PokemonList() {
  const { pokemon, setPokemon, isLoading, pokemonList } = usePokemonContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    onOpen();
  }

  return (
    <>
      <div className="pokemon-list">
      {isLoading &&
          Array.from({ length: 40 }).map((_, index) => (
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
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={pokemon.name}
            />
            <div className="name">
              <p>{pokemon.name}</p>
            </div>
          </div>
        ))}
      </div>
      {pokemon && <PokemonScreen isOpen={isOpen} onClose={onClose} />}
    </>
  );
}

export default PokemonList;
