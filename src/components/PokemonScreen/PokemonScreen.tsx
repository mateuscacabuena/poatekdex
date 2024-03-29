import {
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import "./styles.css";
import pokeball from "../../assets/pokeball.svg";
import About from "./About/About";
import Types from "./Types/Types";
import BaseStats from "./BaseStats/BaseStats";
import {
  ArrowBackIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { usePokemonContext } from "../../hooks/usePokemonContext";
import { useState } from "react";

interface PokemonScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

function PokemonScreen({ isOpen, onClose }: PokemonScreenProps) {
  const { pokemon, setPokemon, pokemonList } = usePokemonContext();
  const [slideAnimation, setSlideAnimation] = useState("");
  const firstType = pokemon.types[0];

  function handleNextPokemon() {
    const nextPokemon = pokemonList.find((p) => p.id === pokemon.id + 1);
    if (nextPokemon) {
      setSlideAnimation("center-to-left");
      setTimeout(() => {
        setPokemon(nextPokemon);
        setSlideAnimation("right-to-center");
        setTimeout(() => {
          setSlideAnimation("");
        }, 200);
      }, 99);
    }
  }

  function handlePreviousPokemon() {
    const previousPokemon = pokemonList.find((p) => p.id === pokemon.id - 1);
    if (previousPokemon) {
      setSlideAnimation("center-to-right");
      setTimeout(() => {
        setPokemon(previousPokemon);
        setSlideAnimation("left-to-center");
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
          if (event.key === "ArrowLeft") {
            handlePreviousPokemon();
          } else if (event.key === "ArrowRight") {
            handleNextPokemon();
          }
        }}
      >
        <div className={"pokemon-screen " + firstType + " " + slideAnimation}>
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
            <p className="number">#{pokemon.id}</p>
          </div>
          <img src={pokeball} alt="pokeball" className="pokeball-icon" />
          <div className="image-container">
            <IconButton
              aria-label="Back"
              isRound
              icon={<ChevronLeftIcon boxSize={"1.5rem"} color={"#FFFFFF"} />}
              backgroundColor={"transparent"}
              _hover={{ backgroundColor: "transparent", opacity: 0.5 }}
              onClick={handlePreviousPokemon}
            />
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt="pokemon image"
              className="pokemon-image"
              loading="eager"
            />
            <IconButton
              aria-label="Next"
              isRound
              icon={<ChevronRightIcon boxSize={"1.5rem"} color={"#FFFFFF"} />}
              backgroundColor={"transparent"}
              _hover={{ backgroundColor: "transparent", opacity: 0.5 }}
              onClick={handleNextPokemon}
            />
          </div>
          <div className="info">
            <Types />
            <h2>About</h2>
            <About />
            <p className="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              iaculis eros vitae tellus condimentum maximus sit amet in eros.
            </p>
            <h2>Base Stats</h2>
            <BaseStats />
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}

export default PokemonScreen;