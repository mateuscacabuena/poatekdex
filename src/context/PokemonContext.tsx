import { createContext, useEffect, useState } from "react";
import { Pokemon } from "../interface/interfaces";

export const PokemonContext = createContext<PokemonContextType>(
  {} as PokemonContextType
);

interface PokemonContextType {
  pokemon: Pokemon;
  setPokemon: (pokemon: Pokemon) => void;
  pokemonList: Pokemon[];
  setPokemonList: (pokemon: Pokemon[]) => void;
  isLoading: boolean;
}

export const PokemonProvider = ({ children }: any) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  async function fetchPokemons() {
    const promises = [];
    for (let i = 1; i <= 151; i++) {
      promises.push(
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((response) =>
          response.json()
        )
      );
    }

    const responses = await Promise.all(promises);
    const pokemons = responses.map((response) => {
      const { abilities, height, id, name, stats, types, weight } = response;
      const description = "teste de descricao";

      return {
        abilities,
        description,
        height,
        id,
        name,
        stats,
        types,
        weight,
      };
    });

    setPokemonList(pokemons);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <PokemonContext.Provider
      value={
        { pokemon, setPokemon, pokemonList, setPokemonList, isLoading } as any
      }
    >
      {children}
    </PokemonContext.Provider>
  );
};
