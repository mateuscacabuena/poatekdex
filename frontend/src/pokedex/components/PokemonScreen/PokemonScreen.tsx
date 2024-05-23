import {
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import "./styles.css";
import pokeball from "../../../assets/pokeball.svg";
import About from "./components/About/About";
import Types from "./components/Types/Types";
import BaseStats from "./components/BaseStats/BaseStats";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { usePokemonContext } from "../../../hooks/usePokemonContext";
import { useState } from "react";
import { idFormater } from "../../../utils/utils";
import ImageContainer from "./components/ImageContainer/ImageContainer";
import { useTrainerContext } from "../../../hooks/useTrainerContext";

interface PokemonScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

function PokemonScreen({ isOpen, onClose }: PokemonScreenProps) {
  const { pokemon, setPokemon, pokemonList, setIsUnknown } =
    usePokemonContext();
  const { trainer } = useTrainerContext();
  const [slideAnimation, setSlideAnimation] = useState("");
  const firstType = pokemon.types[0];

  function handlePokemon(direction: String) {
    const offset = direction === "ArrowRight" ? 1 : -1;
    const newPokemon = pokemonList.find((p) => p.id === pokemon.id + offset);

    if (newPokemon) {
      const slideAnimationIn =
        direction === "ArrowRight" ? "center-to-left" : "center-to-right";
      const slideAnimationOut =
        direction === "ArrowRight" ? "right-to-center" : "left-to-center";

      const unknownPokemon = {
        id: newPokemon.id,
        name: "???",
        weight: 0,
        height: 0,
        imageUrl: newPokemon.imageUrl,
        types: ["unknown"],
        abilities: ["???"],
        stats: [
          {
            name: "hp",
            base_stat: 0,
          },
          {
            name: "attack",
            base_stat: 0,
          },
          {
            name: "defense",
            base_stat: 0,
          },
          {
            name: "special-attack",
            base_stat: 0,
          },
          {
            name: "special-defense",
            base_stat: 0,
          },
          {
            name: "speed",
            base_stat: 0,
          },
        ],
        description: "This pokémon is unknown. Catch it to know more!",
      };

      setSlideAnimation(slideAnimationIn);
      setTimeout(() => {
        const isPokemonCatched = trainer.pokemons.find(
          (p) => p.id === newPokemon.id
        );
        if (isPokemonCatched) {
          setPokemon(newPokemon);
          setIsUnknown(false);
        } else {
          setPokemon(unknownPokemon);
          setIsUnknown(true);
        }
        setSlideAnimation(slideAnimationOut);
        setTimeout(() => {
          setSlideAnimation("");
        }, 200);
      }, 99);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInRight"
    >
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent
        bg={"transparent"}
        boxShadow={"none"}
        onKeyDown={(event) => {
          handlePokemon(event.key);
        }}
      >
        <div
          className={"pokemon-screen " + firstType + " " + slideAnimation}
          data-cy="pokemon-screen"
        >
          <div className="title">
            <IconButton
              aria-label="Close"
              isRound
              icon={<ArrowBackIcon boxSize={"2rem"} color={"#FFFFFF"} />}
              backgroundColor={"transparent"}
              _hover={{ backgroundColor: "transparent", opacity: 0.5 }}
              onClick={onClose}
            />
            <h1 className="name">{pokemon.name}</h1>
            <p className="number">#{idFormater(pokemon.id)}</p>
          </div>
          <img
            src={pokeball}
            alt="pokeball"
            className="pokeball-icon"
            loading="eager"
          />
          <ImageContainer handlePokemon={handlePokemon} />
          <div className="info">
            <Types />
            <h2>About</h2>
            <About />
            <p className="description">{pokemon.description}</p>
            <h2>Base Stats</h2>
            <BaseStats />
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}

export default PokemonScreen;
