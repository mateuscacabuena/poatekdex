import {
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import "./styles.css";
import pokeball from "../../../assets/pokeball.svg";
import About from "./About/About";
import Types from "./Types/Types";
import BaseStats from "./BaseStats/BaseStats";
import {
  ArrowBackIcon,
} from "@chakra-ui/icons";
import { usePokemonContext } from "../../hooks/usePokemonContext";
import { useState } from "react";
import { idFormater } from "../../utils/utils";
import ImageContainer from "./ImageContainer/ImageContainer";

interface PokemonScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

function PokemonScreen({ isOpen, onClose }: PokemonScreenProps) {
  const { pokemon, setPokemon, pokemonList } = usePokemonContext();
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

      setSlideAnimation(slideAnimationIn);
      setTimeout(() => {
        setPokemon(newPokemon);
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
            <p className="number">#{idFormater(pokemon.id)}</p>
          </div>
          <img src={pokeball} alt="pokeball" className="pokeball-icon" />
          <ImageContainer handlePokemon={handlePokemon} />
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