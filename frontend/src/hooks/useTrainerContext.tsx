import { useContext } from "react";
import { TrainerContext } from "../context/TrainerContext";

export const useTrainerContext = () => {
  const context = useContext(TrainerContext);
  if (!context) {
    throw new Error("useTrainerContext must be used within a PokemonProvider");
  }
  return context;
};
