import { createContext, useEffect, useState } from "react";
import { Pokemon, Trainer } from "../interface/interfaces";
import { capitalizeFirstLetter } from "../pokedex/utils/utils";
import axios from "axios";

export const PokemonContext = createContext<PokemonContextType>(
  {} as PokemonContextType
);

interface PokemonContextType {
  pokemon: Pokemon;
  setPokemon: (pokemon: Pokemon) => void;
  trainerList: Trainer[];
  setTrainerList: (trainers: Trainer[]) => void;
  pokemonList: Pokemon[];
  setPokemonList: (pokemon: Pokemon[]) => void;
  isLoading: boolean;
  totalPokemons: number;
}

export const PokemonProvider = ({ children }: any) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [trainerList, setTrainerList] = useState<Trainer[]>([]);
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

  async function fetchTrainers() {
    try {
      const response = await axios.get("http://localhost:5000/api/trainer");
      const trainers = response.data;
      setTrainerList(trainers);
    } catch (error) {
      console.error("Erro ao recuperar os treinadores:", error);
    }
  }

  useEffect(() => {
    fetchPokemons();
    fetchTrainers();
  }, []);

  return (
    <PokemonContext.Provider
      value={
        {
          pokemon,
          setPokemon,
          pokemonList,
          setPokemonList,
          trainerList,
          setTrainerList,
          isLoading,
          totalPokemons,
        } as any
      }
    >
      {children}
    </PokemonContext.Provider>
  );
};
