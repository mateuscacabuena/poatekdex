import "./styles.css";
import { usePokemonContext } from "../../../hooks/usePokemonContext";
import { idFormater } from "../../utils/utils";
import { useTrainerContext } from "../../../hooks/useTrainerContext";

interface PokemonListProps {
  onOpen: () => void;
}

function PokemonList({ onOpen }: PokemonListProps) {
  const { getPokemon, setPokemon, setIsUnknown } = usePokemonContext();
  const { addPokemon, setTrainer, catchedPokemons } = useTrainerContext();

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

  return (
    <div className="pokemon-list">
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
            loading="lazy"
            className={pokemonTrainer.name == "Unknown" ? "unknown-image" : ""}
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