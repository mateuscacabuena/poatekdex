import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import Title from "./components/Title/Title";
import PokemonList from "./components/PokemonList/PokemonList";
import { usePokemonContext } from "./hooks/usePokemonContext";
import { useDisclosure } from "@chakra-ui/react";
import PokemonScreen from "./components/PokemonScreen/PokemonScreen";

function App() {
  const { pokemon } = usePokemonContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="App">
      <header>
        <Title />
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
