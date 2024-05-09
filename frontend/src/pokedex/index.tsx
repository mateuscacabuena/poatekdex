import "./styles.css";
import SearchBar from "./components/SearchBar/SearchBar";
import PokemonList from "./components/PokemonList/PokemonList";
import { usePokemonContext } from "../hooks/usePokemonContext";
import { useDisclosure } from "@chakra-ui/react";
import PokemonScreen from "./components/PokemonScreen/PokemonScreen";
import pokeball from "../assets/pokeball.svg";
import { useNavigate } from "react-router-dom";

function Pokedex() {
  const { pokemon } = usePokemonContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <>
      <div className="Pokedex">
        <header className="pokedex-header">
          <div className="pokedex-title">
            <div className="pokedex-trainer">
              <img src={pokeball} alt="pokeball" />
              <h1>Pokédex</h1>
            </div>
            <p className="change-trainer" onClick={() => navigate("/")}>
              Change Trainer
            </p>
          </div>
          <SearchBar onOpen={onOpen} />
        </header>
        <main className="pokedex-content">
          <PokemonList onOpen={onOpen} />
          {pokemon && <PokemonScreen isOpen={isOpen} onClose={onClose} />}
        </main>
      </div>
    </>
  );
}

export default Pokedex;
