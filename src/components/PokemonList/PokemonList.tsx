import "./styles.css";
import { useNavigate } from "react-router-dom";

function PokemonList() {
    const navigate = useNavigate();

  function handlePokemonClick() {
    navigate("/bulbasaur");
  }

  return (
    <div className="pokemon-list">
      <div className="pokemon-card" onClick={handlePokemonClick}>
        <div className="number">
          <p>#001</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="bulbasaur"
        />
        <div className="name">
          <p>bulbasaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#002</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
          alt="ivysaur"
        />
        <div className="name">
          <p>ivysaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#003</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
          alt="venusaur"
        />
        <div className="name">
          <p>venusaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#001</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="bulbasaur"
        />
        <div className="name">
          <p>bulbasaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#002</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
          alt="ivysaur"
        />
        <div className="name">
          <p>ivysaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#003</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
          alt="venusaur"
        />
        <div className="name">
          <p>venusaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#001</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="bulbasaur"
        />
        <div className="name">
          <p>bulbasaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#002</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
          alt="ivysaur"
        />
        <div className="name">
          <p>ivysaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#003</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
          alt="venusaur"
        />
        <div className="name">
          <p>venusaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#001</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="bulbasaur"
        />
        <div className="name">
          <p>bulbasaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#002</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
          alt="ivysaur"
        />
        <div className="name">
          <p>ivysaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#003</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
          alt="venusaur"
        />
        <div className="name">
          <p>venusaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#001</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="bulbasaur"
        />
        <div className="name">
          <p>bulbasaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#002</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
          alt="ivysaur"
        />
        <div className="name">
          <p>ivysaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#003</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
          alt="venusaur"
        />
        <div className="name">
          <p>venusaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#001</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="bulbasaur"
        />
        <div className="name">
          <p>bulbasaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#002</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
          alt="ivysaur"
        />
        <div className="name">
          <p>ivysaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#003</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
          alt="venusaur"
        />
        <div className="name">
          <p>venusaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#001</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="bulbasaur"
        />
        <div className="name">
          <p>bulbasaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#002</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
          alt="ivysaur"
        />
        <div className="name">
          <p>ivysaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#003</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
          alt="venusaur"
        />
        <div className="name">
          <p>venusaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#001</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="bulbasaur"
        />
        <div className="name">
          <p>bulbasaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#002</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
          alt="ivysaur"
        />
        <div className="name">
          <p>ivysaur</p>
        </div>
      </div>
      <div className="pokemon-card">
        <div className="number">
          <p>#003</p>
        </div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
          alt="venusaur"
        />
        <div className="name">
          <p>venusaur</p>
        </div>
      </div>
    </div>
  );
}

export default PokemonList;
