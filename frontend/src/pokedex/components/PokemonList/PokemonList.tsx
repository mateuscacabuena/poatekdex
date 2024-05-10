import "./styles.css";
import { usePokemonContext } from "../../../hooks/usePokemonContext";
import { TrainerPokemon } from "../../../interface/interfaces";
import { idFormater } from "../../utils/utils";
import { useTrainerContext } from "../../../hooks/useTrainerContext";

interface PokemonListProps {
  onOpen: () => void;
}

function PokemonList({ onOpen }: PokemonListProps) {
  const { getPokemon, setPokemon, setIsUnknown } =
    usePokemonContext();
  const { addPokemon, setTrainer, catchedPokemons } =
    useTrainerContext();

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

  function renderPokemonCard(pokemon: TrainerPokemon) {
    return (
      <div
        className="pokemon-card"
        key={pokemon.id}
        onClick={
          pokemon.name == "Unknown"
            ? () => catchPokemon(pokemon.id)
            : () => handlePokemonClick(pokemon.id)
        }
      >
        <div className="number">
          <p>#{idFormater(pokemon.id)}</p>
        </div>
        <img
          src={pokemon.imageUrl}
          alt={pokemon.name}
          loading="lazy"
          className={pokemon.name == "Unknown" ? "unknown-image" : ""}
        />
        <div className="name">
          <p>{pokemon.name}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pokemon-list">{catchedPokemons.map(renderPokemonCard)}</div>
  );
}

export default PokemonList;
