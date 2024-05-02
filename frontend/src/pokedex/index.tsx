import "./styles.css";
import SearchBar from "./components/SearchBar/SearchBar";
import PokemonList from "./components/PokemonList/PokemonList";
import { usePokemonContext } from "./hooks/usePokemonContext";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import PokemonScreen from "./components/PokemonScreen/PokemonScreen";
import pokeball from "../assets/pokeball.svg";
import TrainerDrawer from "./components/Drawer";
import { HamburgerIcon } from "@chakra-ui/icons";

function Pokedex() {
  const { pokemon } = usePokemonContext();
  const modal = useDisclosure();
  const drawer = useDisclosure();

  return (
    <>
      <div className="Pokedex">
        <header className="pokedex-header">
          <div className="pokedex-title">
            <div className="pokedex-trainer">
              <img src={pokeball} alt="pokeball" />
              <h1>Pokédex</h1>
            </div>
            <IconButton onClick={drawer.onOpen} bgColor={"transparent"} color={"white"} aria-label="Trainer" icon={<HamburgerIcon />}  />
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
      <TrainerDrawer isOpen={drawer.isOpen} onClose={drawer.onClose} />
    </>
  );
}

export default Pokedex;
