import { createContext, useEffect, useState } from "react";
import { Pokemon } from "../interface/interfaces";
import PokemonAPI from "../services/pokemonAPI";

export const PokemonContext = createContext<PokemonContextType>(
  {} as PokemonContextType
);

interface PokemonContextType {
  pokemon: Pokemon;
  setPokemon: (pokemon: Pokemon) => void;
  pokemonList: Pokemon[];
  setPokemonList: (pokemons: Pokemon[]) => void;
  isLoading: boolean;
  totalPokemons: number;
  getPokemon: (id: number) => Pokemon;
}

export const PokemonProvider = ({ children }: any) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const totalPokemons = 251;

  async function getPokemons() {
    try {
      const pokemons = await PokemonAPI.getPokemonList();
      setPokemonList(pokemons);
      return pokemons;
    } catch (error) {
      console.error("Pokemon request error: ", error);
    }
  }

  async function getPokemon(id: number) {
    try {
      const pokemon = await PokemonAPI.getPokemonById(id);
      return pokemon;
    } catch (error) {
      console.error("Pokemon request error: ", error);
    }
  }

  useEffect(() => {
    setIsLoading(false);
    getPokemons();
  }, []);

  return (
    <PokemonContext.Provider
      value={
        {
          pokemon,
          setPokemon,
          pokemonList,
          setPokemonList,
          isLoading,
          totalPokemons,
          getPokemon,
        } as any
      }
    >
      {children}
    </PokemonContext.Provider>
  );
};