import "./styles.css";
import { IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { usePokemonContext } from "../../../../hooks/usePokemonContext";

interface ImageContainerProps {
  handlePokemon: (direction: string) => void;
}

function ImageContainer({ handlePokemon }: ImageContainerProps) {
  const { pokemon } = usePokemonContext();

  return (
    <div className="image-container">
      <IconButton
        aria-label="Back"
        isRound
        icon={<ChevronLeftIcon boxSize={"1.5rem"} color={"#FFFFFF"} />}
        backgroundColor={"transparent"}
        _hover={{ backgroundColor: "transparent", opacity: 0.5 }}
        onClick={() => handlePokemon("ArrowLeft")}
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
        onClick={() => handlePokemon("ArrowRight")}
      />
    </div>
  );
}

export default ImageContainer;
