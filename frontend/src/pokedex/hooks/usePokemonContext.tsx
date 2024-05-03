import { useContext } from "react";
import { PokemonContext } from "../../context/PokemonContext";

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemonContext must be used within a PokemonProvider");
  }
  return context;
};
