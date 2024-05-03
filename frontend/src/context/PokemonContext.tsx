import { createContext, useEffect, useState } from "react";
import { Pokemon } from "../pokedex/interface/interfaces";
import { capitalizeFirstLetter } from "../utils/utils";

export const PokemonContext = createContext<PokemonContextType>(
  {} as PokemonContextType
);

interface PokemonContextType {
  pokemon: Pokemon;
  setPokemon: (pokemon: Pokemon) => void;
  pokemonList: Pokemon[];
  setPokemonList: (pokemon: Pokemon[]) => void;
  isLoading: boolean;
  totalPokemons: number;
}

export const PokemonProvider = ({ children }: any) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const totalPokemons = 251;

  async function fetchPokemons() {
    const promises = [];
    for (let i = 1; i <= totalPokemons; i++) {
      promises.push(
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((response) =>
          response.json()
        )
      );
    }

    const responses = await Promise.all(promises);
    const pokemons = responses.map((response) => {
      const { abilities, height, id, name, stats, types, weight } = response;
      const capitalizedAbilities = abilities.map((ability: any) => {
        return capitalizeFirstLetter(ability.ability.name);
      });
      const metresHeight = height / 10;
      const capitalizedName = capitalizeFirstLetter(name);
      const capitalizedTypes = types.map((type: any) => {
        return capitalizeFirstLetter(type.type.name);
      });
      const kilogramsWeight = weight / 10;
      const description = "Descrição";
      const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {
        abilities: capitalizedAbilities,
        description,
        height: metresHeight,
        id,
        name: capitalizedName,
        stats,
        types: capitalizedTypes,
        weight: kilogramsWeight,
        img: img,
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
        {
          pokemon,
          setPokemon,
          pokemonList,
          setPokemonList,
          isLoading,
          totalPokemons,
        } as any
      }
    >
      {children}
    </PokemonContext.Provider>
  );
};
