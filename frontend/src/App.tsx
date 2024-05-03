import "./App.css";
import { useNavigate } from "react-router-dom";
import { usePokemonContext } from "./pokedex/hooks/usePokemonContext";

function App() {
  const navigate = useNavigate();
  const { trainerList } = usePokemonContext();

  function handleTrainer() {
    navigate(`/pokedex`);
  }

  return (
    <div className="App">
      <header className="trainer-header">
        <h1>Bem-vindo à Poatekdex!</h1>
        <p>Escolha a Pokedex que deseja acessar:</p>
      </header>
      <main className="trainer-content">
        {trainerList  &&
          trainerList.map((trainer) => (
            <div
              className="trainer-card"
              key={trainer.id}
              onClick={() => handleTrainer()}
            >
              <div className="trainer-name">
                <p>{trainer.name}</p>
              </div>
            </div>
          ))}
      </main>
    </div>
  );
}

export default App;
