import { createContext, useEffect, useState } from "react";
import { Pokemon, Trainer } from "../interface/interfaces";
import axios from "axios";

export const PokemonContext = createContext<PokemonContextType>(
  {} as PokemonContextType
);

interface PokemonContextType {
  pokemon: Pokemon;
  setPokemon: (pokemon: Pokemon) => void;
  trainer: Trainer;
  setTrainer: (trainer: Trainer) => void;
  trainerList: Trainer[];
  setTrainerList: (trainers: Trainer[]) => void;
  pokemonList: Pokemon[];
  setPokemonList: (pokemon: Pokemon[]) => void;
  isLoading: boolean;
  totalPokemons: number;
  pokemonCard: (id: number) => void;
  getPokemonById: (id: number) => Pokemon;
}

export const PokemonProvider = ({ children }: any) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [trainerList, setTrainerList] = useState<Trainer[]>([]);
  const [trainer, setTrainer] = useState<Trainer>();
  const totalPokemons = 251;

  async function fetchPokemons() {
    const response = await axios.get("http://localhost:5000/api/pokemon");
    const pokemons = response.data;
    setPokemonList(pokemons);
    setIsLoading(false);
  }

  async function fetchTrainers() {
    try {
      const response = await axios.get("http://localhost:5000/api/trainer");
      const trainers = response.data;
      setTrainerList(trainers);
    } catch (error) {
      console.error("Trainers request error: ", error);
    }
  }

  async function pokemonCard(id: number) {
    try {
      const response = await axios.get(`http://localhost:5000/api/pokemon/${id}`);
      const pokemon = response.data;
      setPokemon(pokemon);
    } catch (error) {
      console.error("Pokemon request error: ", error);
    }
  }

  async function getPokemonById (id: number) {
    try {
      const response = await axios.get(`http://localhost:5000/api/pokemon/${id}`);
      const pokemon = response.data;
      return pokemon;
    } catch (error) {
      console.error("Pokemon request error: ", error);
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
          trainer,
          setTrainer,
          pokemonList,
          setPokemonList,
          trainerList,
          setTrainerList,
          isLoading,
          totalPokemons,
          pokemonCard,
          getPokemonById
        } as any
      }
    >
      {children}
    </PokemonContext.Provider>
  );
};
