import { IconButton } from "@chakra-ui/react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
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

function PokemonScreen() {
  const navigate = useNavigate();
  const { pokemon } = usePokemonContext();
  const firstType = pokemon.types[0].type.name;

  function handleBack() {
    navigate("/");
  }

  return (
    <div className="background">
      <div className={'pokemon-screen ' + firstType}>
        <div className="title">
          <IconButton
            aria-label="Back"
            icon={<ArrowBackIcon boxSize={"2rem"} color={"#FFFFFF"} />}
            backgroundColor={"transparent"}
            _hover={{ backgroundColor: "transparent", opacity: 0.5}}
            onClick={handleBack}
          />
          <h1 className="name">{pokemon.name}</h1>
          <p className="number">#{pokemon.id}</p>
        </div>
        <img src={pokeball} alt="pokeball" className="pokeball-icon" />
        <div className="image-container">
          <IconButton
            aria-label="Back"
            icon={<ChevronLeftIcon boxSize={"1.5rem"} color={"#FFFFFF"} />}
            backgroundColor={"transparent"}
            _hover={{ backgroundColor: "transparent", opacity: 0.5}}
          />
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt="pokemon image"
            className="pokemon-image"
          />
          <IconButton
            aria-label="Back"
            icon={<ChevronRightIcon boxSize={"1.5rem"} color={"#FFFFFF"} />}
            backgroundColor={"transparent"}
            _hover={{ backgroundColor: "transparent", opacity: 0.5}}
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
    </div>
  );
}

export default PokemonScreen;
