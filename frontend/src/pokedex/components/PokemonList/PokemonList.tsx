import "./styles.css";
import { usePokemonContext } from "../../../hooks/usePokemonContext";
import { idFormater } from "../../../utils/utils";
import { useTrainerContext } from "../../../hooks/useTrainerContext";
import { useState } from "react";
import { Skeleton } from "@chakra-ui/react";

interface PokemonListProps {
  onOpen: () => void;
}

function PokemonList({ onOpen }: PokemonListProps) {
  const { getPokemon, setPokemon, setIsUnknown } = usePokemonContext();
  const { addPokemon, setTrainer, catchedPokemons } = useTrainerContext();
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const totalImages = catchedPokemons.length;
  const allImagesLoaded = loadedImagesCount === totalImages;
  
  async function handlePokemonClick(id: number) {
    const pokemon = await getPokemon(id);
    setPokemon(pokemon);
    setIsUnknown(false);
    onOpen();
  }

  async function catchPokemon(id: number) {
    const newTrainer = await addPokemon(id);
    localStorage.setItem("trainer", JSON.stringify(newTrainer));
    setTrainer(newTrainer);
  }

  return (
    <div className="pokemon-list" data-cy="pokemon-list">
      {!allImagesLoaded &&
        Array.from({ length: 251 }).map((_, index) => (
          <Skeleton key={index} height="110px" borderRadius=".5rem" />
        ))}
      {catchedPokemons.map((pokemonTrainer) => (
        <div
          className="pokemon-card"
          key={pokemonTrainer.id}
          onClick={
            pokemonTrainer.name == "Unknown"
              ? () => catchPokemon(pokemonTrainer.id)
              : () => handlePokemonClick(pokemonTrainer.id)
          }
        >
          <div className="number">
            <p>#{idFormater(pokemonTrainer.id)}</p>
          </div>
          <img
            src={pokemonTrainer.imageUrl}
            alt={pokemonTrainer.name}
            loading="eager"
            className={pokemonTrainer.name == "Unknown" ? "unknown-image" : ""}
            onLoad={() => setLoadedImagesCount((prevCount) => prevCount + 1)}
          />
          <div className="name">
            <p>{pokemonTrainer.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PokemonList;