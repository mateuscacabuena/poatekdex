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
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function PokemonScreen({ isOpen, onClose }: Props) {
  const { pokemon, setPokemon, pokemonList } = usePokemonContext();
  const [slideAnimation, setSlideAnimation] = useState("");
  const firstType = pokemon.types[0];

  function handleNextPokemon() {
    const nextPokemon = pokemonList.find((p) => p.id === pokemon.id + 1);
    if (nextPokemon) {
      setSlideAnimation("slide-left");
      setTimeout(() => {
        setPokemon(nextPokemon);
        setSlideAnimation("");
      }, 100); 
    }
  }

  function handlePreviousPokemon() {
    const previousPokemon = pokemonList.find((p) => p.id === pokemon.id - 1);
    if (previousPokemon) {
      setSlideAnimation("slide-right");
      setTimeout(() => {
        setPokemon(previousPokemon);
        setSlideAnimation("");
      }, 100); 
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "ArrowRight") {
        handleNextPokemon();
      } else if (event.key === "ArrowLeft") {
        handlePreviousPokemon();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNextPokemon, handlePreviousPokemon]);

  return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent bg={'transparent'}>
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
              />
              <IconButton
                aria-label="Back"
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
