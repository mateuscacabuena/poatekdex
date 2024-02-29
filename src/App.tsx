import "./App.css";
import SearchBar from "./components/PokemonList/SearchBar/SearchBar";
import Title from "./components/Title/Title";
import PokemonList from "./components/PokemonList/PokemonList";

function App() {
  return (
    <div className="App">
      <header>
        <Title />
        <SearchBar />
      </header>
      <main>
        <PokemonList />
      </main>
    </div>
  );
}

export default App;
