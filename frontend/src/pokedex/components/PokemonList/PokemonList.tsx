import "./styles.css";
import { Skeleton } from "@chakra-ui/react";
import { usePokemonContext } from "../../hooks/usePokemonContext";
import { PokemonTrainer } from "../../../interface/interfaces";
import { idFormater } from "../../utils/utils";
import axios from "axios";

interface PokemonListProps {
  onOpen: () => void;
}

function PokemonList({ onOpen }: PokemonListProps) {
  const { isLoading, totalPokemons, pokemonCard, getPokemonById } =
    usePokemonContext();

  const trainerPokemonArray: (PokemonTrainer | null)[] = Array.from(
    { length: totalPokemons },
    () => null
  );

  const trainer = JSON.parse(localStorage.getItem("trainer")!);
console.log(trainer.pokemons)
  trainer.pokemons.map((pokemon: any) => {
    trainerPokemonArray[pokemon.id - 1] = pokemon;
  });

  function handlePokemonClick(id: number) {
    pokemonCard(id);
    onOpen();
  }

  async function addPokemon(id: number) {
    if(!trainer) return;

    const pokemon = await getPokemonById(id);
    
    const obj = {
      id: pokemon.id,
      name: pokemon.name,
      imageUrl: pokemon.imageUrl
    }

    const body = {
      id: trainer.id,
      name: trainer.name,
      pokemons: [...trainer.pokemons, obj]
    }

    const response = await axios.put(`http://localhost:5000/api/trainer/${trainer.id}`, body);
    localStorage.setItem("trainer", JSON.stringify(response.data));
    
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
          <img src={pokemon.imageUrl} alt={pokemon.name} />
          <div className="name">
            <p>{pokemon.name}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="pokemon-card" key={index + 1} onClick={() => addPokemon(index + 1)}>
          <div className="number">
            <p>#{idFormater(index + 1)}</p>
          </div>
          <img
            src={"https://cdn-icons-png.flaticon.com/512/5726/5726624.png"}
            alt={"unknown"}
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
      {isLoading &&
        Array.from({ length: totalPokemons }).map((_, index) => (
          <Skeleton key={index} height="110px" borderRadius=".5rem" />
        ))}
      {trainerPokemonArray.map(renderPokemonCard)}
    </div>
  );
}

export default PokemonList;
