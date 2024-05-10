import "./styles.css";
import { usePokemonContext } from "../../../hooks/usePokemonContext";
import { TrainerPokemon } from "../../../interface/interfaces";
import { idFormater } from "../../utils/utils";
import { useTrainerContext } from "../../../hooks/useTrainerContext";
import { useEffect, useState } from "react";

interface PokemonListProps {
  onOpen: () => void;
}

function PokemonList({ onOpen }: PokemonListProps) {
  const { totalPokemons, getPokemon, setPokemon, setIsUnknown } = usePokemonContext();
  const { addPokemon, trainer, setTrainer } = useTrainerContext();
  const [catchedPokemons, setCatchedPokemons] = useState<
    (TrainerPokemon | null)[]
  >([]);

  async function handlePokemonClick(id: number) {
    const pokemon = await getPokemon(id);
    setPokemon(pokemon);
    setIsUnknown(false);
    onOpen();
  }

  async function catchPokemon(id: number) {
    const newTrainer = await addPokemon(id);
    setTrainer(newTrainer);
  }

  function renderPokemonCard(pokemon: TrainerPokemon | null, index: number) {
    if (pokemon) {
      return (
        <div
          className="pokemon-card"
          key={pokemon.id}
          onClick={() => handlePokemonClick(pokemon.id)}
        >
          <div className="number">
            <p>#{idFormater(pokemon.id)}</p>
          </div>
          <img src={pokemon.imageUrl} alt={pokemon.name} loading="lazy" />
          <div className="name">
            <p>{pokemon.name}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="pokemon-card"
          key={index + 1}
          onClick={() => catchPokemon(index + 1)}
        >
          <div className="number">
            <p>#{idFormater(index + 1)}</p>
          </div>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              index + 1
            }.png`}
            className="unknown-image"
            alt={"unknown"}
            loading="lazy"
          />
          <div className="name">
            <p>Unknown</p>
          </div>
        </div>
      );
    }
  }

  useEffect(() => {
    const trainerPokemonArray: (TrainerPokemon | null)[] = Array.from(
      { length: totalPokemons },
      () => null
    );

    trainer.pokemons.map((pokemon: any) => {
      trainerPokemonArray[pokemon.id - 1] = pokemon;
    });

    setCatchedPokemons(trainerPokemonArray);
  }, [trainer]);

  return (
    <div className="pokemon-list">{catchedPokemons.map(renderPokemonCard)}</div>
  );
}

export default PokemonList;
