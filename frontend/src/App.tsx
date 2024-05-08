import "./App.css";
import { useNavigate } from "react-router-dom";
import { usePokemonContext } from "./pokedex/hooks/usePokemonContext";
import user from "./assets/user.png";
import poatek from "./assets/poatek.png";
import { Trainer } from "./interface/interfaces";

function App() {
  const navigate = useNavigate();
  const { trainerList } = usePokemonContext();

  function handleTrainer(trainer: Trainer) {
    localStorage.setItem("trainer", JSON.stringify(trainer));
    navigate(`/pokedex`);
  }

  return (
    <div className="App">
      <header className="trainer-header">
        <div className="trainer-title">
          <img src={poatek} alt={"poatek logo"} />
          <h1>Bem-vindo à Poatekdex!</h1>
        </div>
        <p>Escolha a Pokedex que deseja acessar:</p>
      </header>
      <main className="trainer-content">
        {trainerList &&
          trainerList.map((trainer) => (
            <div
              className="trainer-card"
              key={trainer.id}
              onClick={() => handleTrainer(trainer)}
            >
              <div className="trainer-avatar">
                <img src={trainer.imageUrl ?? user} alt={trainer.name} />
              </div>
              <div className="trainer-name">
                <p>
                  {trainer.name}, {trainer.pokemons ? trainer.pokemons.length : 0}{" "}
                  pokemon(s)
                </p>
              </div>
            </div>
          ))}
      </main>
    </div>
  );
}

export default App;
