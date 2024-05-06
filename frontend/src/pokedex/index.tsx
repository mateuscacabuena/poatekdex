import "./styles.css";
import SearchBar from "./components/SearchBar/SearchBar";
import PokemonList from "./components/PokemonList/PokemonList";
import { usePokemonContext } from "./hooks/usePokemonContext";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import PokemonScreen from "./components/PokemonScreen/PokemonScreen";
import pokeball from "../assets/pokeball.svg";
import TrainerDrawer from "./components/Drawer";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function Pokedex() {
  const { pokemon } = usePokemonContext();
  const modal = useDisclosure();
  const drawer = useDisclosure();
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
            <p className="change-trainer" onClick={() => navigate('/')}>Change Trainer</p>
          </div>
          <SearchBar onOpen={modal.onOpen} />
        </header>
        <main className="pokedex-content">
          <PokemonList onOpen={modal.onOpen} />
          {pokemon && (
            <PokemonScreen isOpen={modal.isOpen} onClose={modal.onClose} />
          )}
        </main>
      </div>
    </>
  );
}

export default Pokedex;
