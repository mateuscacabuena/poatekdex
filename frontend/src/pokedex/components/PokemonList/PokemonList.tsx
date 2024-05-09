import "./styles.css";
import { usePokemonContext } from "../../../hooks/usePokemonContext";
import { PokemonTrainer } from "../../../interface/interfaces";
import { idFormater } from "../../utils/utils";
import { useTrainerContext } from "../../../hooks/useTrainerContext";

interface PokemonListProps {
  onOpen: () => void;
}

function PokemonList({ onOpen }: PokemonListProps) {
  const { totalPokemons, getPokemon, setPokemon } =
    usePokemonContext();

  const { addPokemon } = useTrainerContext();

  const trainerPokemonArray: (PokemonTrainer | null)[] = Array.from(
    { length: totalPokemons },
    () => null
  );

  const trainer = JSON.parse(localStorage.getItem("trainer")!);

  trainer.pokemons.map((pokemon: any) => {
    trainerPokemonArray[pokemon.id - 1] = pokemon;
  });

  async function handlePokemonClick(id: number) {
    const pokemon = await getPokemon(id);
    setPokemon(pokemon);
    onOpen();
  }

  async function catchPokemon(id: number) {
    const newTrainer = await addPokemon(id);

    localStorage.setItem("trainer", JSON.stringify(newTrainer));
    window.location.reload();
  }

  function renderPokemonCard(pokemon: PokemonTrainer | null, index: number) {
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
          <img src={pokemon.imageUrl} alt={pokemon.name} loading="lazy"/>
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
            <p>#???</p>
          </div>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`}
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

  return (
    <div className="pokemon-list">
      {trainerPokemonArray.map(renderPokemonCard)}
    </div>
  );
}

export default PokemonList;
