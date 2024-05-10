import { createContext, useEffect, useState } from "react";
import TrainerAPI from "../services/trainerAPI";
import { Trainer, TrainerPokemon } from "../interface/interfaces";
import { usePokemonContext } from "../hooks/usePokemonContext";

export const TrainerContext = createContext<TrainerContextType>(
  {} as TrainerContextType
);

interface TrainerContextType {
  trainer: Trainer;
  setTrainer: (trainer: Trainer) => void;
  trainerList: Trainer[];
  setTrainerList: (trainers: Trainer[]) => void;
  getTrainers: () => Trainer[];
  addPokemon: (id: number) => Trainer;
  addTrainer: (trainer: Trainer) => Trainer;
  excludeTrainer: (id: number) => Trainer;
  catchedPokemons: (TrainerPokemon)[];
  setCatchedPokemons: (catchedPokemons: (TrainerPokemon)[]) => void;
}

export const TrainerProvider = ({ children }: any) => {
  const [trainer, setTrainer] = useState<Trainer>();
  const [trainerList, setTrainerList] = useState<Trainer[]>([]);
  const [catchedPokemons, setCatchedPokemons] = useState<
    (TrainerPokemon)[]
  >([]);
  const { getPokemon, totalPokemons } = usePokemonContext();

  async function getTrainers() {
    try {
      const trainers = await TrainerAPI.getTrainerList();
      setTrainerList(trainers);
      return trainers;
    } catch (error) {
      console.error("Trainers request error: ", error);
    }
  }

  async function addPokemon(id: number) {
    if (!trainer) return "Trainer not found";
    try {
      const pokemon = await getPokemon(id);

      const obj = {
        id: pokemon.id,
        name: pokemon.name,
        imageUrl: pokemon.imageUrl,
      };

      const body = {
        id: trainer.id,
        name: trainer.name,
        imageUrl: trainer.imageUrl,
        pokemons: [...trainer.pokemons, obj],
      };

      const response = await TrainerAPI.updateTrainer(trainer.id, body);
      return response;
    } catch (error) {
      console.error("Pokemon request error: ", error);
    }
  }

  async function excludeTrainer(id: number) {
    try {
      const response = await TrainerAPI.deleteTrainer(id);
      return response;
    } catch (error) {
      console.error("Trainer request error: ", error);
    }
  }

  async function addTrainer(trainer: Trainer) {
    try {
      const response = await TrainerAPI.createTrainer(trainer);
      return response;
    } catch (error) {
      console.error("Trainer request error: ", error);
    }
  }

  useEffect(() => {
    getTrainers();
  }, []);

  useEffect(() => {
    const trainerPokemonArray: TrainerPokemon[] = Array.from(
      { length: totalPokemons },
      (_, index) => ({
        id: index + 1,
        name: "Unknown",
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`
      })
    );

    trainer?.pokemons.map((pokemon: any) => {
      trainerPokemonArray[pokemon.id - 1] = pokemon;
    });

    setCatchedPokemons(trainerPokemonArray);
  }, [trainer]);

  return (
    <TrainerContext.Provider
      value={
        {
          trainer,
          setTrainer,
          trainerList,
          setTrainerList,
          getTrainers,
          addPokemon,
          addTrainer,
          excludeTrainer,
          catchedPokemons,
          setCatchedPokemons,
        } as any
      }
    >
      {children}
    </TrainerContext.Provider>
  );
};