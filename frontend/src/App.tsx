import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import PokemonList from "./components/PokemonList/PokemonList";
import { usePokemonContext } from "./hooks/usePokemonContext";
import { useDisclosure } from "@chakra-ui/react";
import PokemonScreen from "./components/PokemonScreen/PokemonScreen";
import pokeball from './assets/pokeball.svg'

function App() {
  const { pokemon } = usePokemonContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="App">
      <header>
        <div className="Title">
          <img src={pokeball} alt="pokeball" />
          <h1>Pokédex</h1>
        </div>
        <SearchBar onOpen={onOpen} />
      </header>
      <main>
        <PokemonList onOpen={onOpen} />
        {pokemon && <PokemonScreen isOpen={isOpen} onClose={onClose} />}
      </main>
    </div>
  );
}

export default App;
