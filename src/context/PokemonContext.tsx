import { createContext, useState } from "react";
import { Pokemon } from "../interface/interfaces";

export const PokemonContext = createContext<PokemonContextType>({} as PokemonContextType);

interface PokemonContextType {
    pokemon: Pokemon;
    setPokemon: (pokemon: Pokemon) => void;
}

export const PokemonProvider = ({ children }: any) => {
  const [pokemon, setPokemon] = useState<Pokemon>();

  return (
    <PokemonContext.Provider value={{ pokemon, setPokemon } as any}>
      {children}
    </PokemonContext.Provider>
  );
};
