import { IconButton } from "@chakra-ui/react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import pokeball from "../../assets/pokeball.svg";
import About from "./About/About";
import Types from "./Types/Types";
import BaseStats from "./BaseStats/BaseStats";
import { ArrowBackIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

function PokemonScreen() {
  const navigate = useNavigate();

  function handleBack() {
    navigate("/");
  }

  return (
    <div className="pokemon-screen">
      <div className="title">
        <IconButton
          aria-label="Back"
          icon={<ArrowBackIcon boxSize={"2rem"} color={"#FFFFFF"} />}
          backgroundColor={"transparent"}
          onClick={handleBack}
        />
        <h1 className="name">Pokémon Name</h1>
        <p className="number">#999</p>
      </div>
      <img src={pokeball} alt="pokeball" className="pokeball-icon" />
      <div className="image-container">
        <IconButton
          aria-label="Back"
          icon={<ChevronLeftIcon boxSize={"1.5rem"} color={"#FFFFFF"} />}
          backgroundColor={"transparent"}
        />
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="bulbasaur"
          className="pokemon-image"
        />
        <IconButton
          aria-label="Back"
          icon={<ChevronRightIcon boxSize={"1.5rem"} color={"#FFFFFF"} />}
          backgroundColor={"transparent"}
        />
      </div>
      <div className="info">
        <Types />
        <h2>About</h2>
        <About />
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis
          eros vitae tellus condimentum maximus sit amet in eros.
        </p>
        <h2>Base Stats</h2>
        <BaseStats />
      </div>
    </div>
  );
}

export default PokemonScreen;
