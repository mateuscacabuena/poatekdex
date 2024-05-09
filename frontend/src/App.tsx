import "./App.css";
import { useNavigate } from "react-router-dom";
import { useTrainerContext } from "./hooks/useTrainerContext";
import user from "./assets/user.png";
import poatek from "./assets/poatek.png";
import { Trainer } from "./interface/interfaces";
import { IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

function App() {
  const navigate = useNavigate();
  const { trainerList, excludeTrainer } = useTrainerContext();

  function handleTrainer(trainer: Trainer) {
    localStorage.setItem("trainer", JSON.stringify(trainer));
    navigate(`/pokedex`);
  }

  return (
    <div className="App">
      <header className="trainer-header">
        <div className="trainer-title">
          <img src={poatek} alt={"poatek logo"} />
          <h1>Welcome to Poatekdex!</h1>
        </div>
        <p>Choose the pokédex you want access:</p>
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
                  {trainer.name},{" "}
                  {trainer.pokemons ? trainer.pokemons.length : 0} pokémon(s)
                </p>
              </div>
              <IconButton
                aria-label="Exclude Trainer"
                icon={<CloseIcon />}
                color="red"
                onClick={() => excludeTrainer(trainer.id)}
              />
            </div>
          ))}
      </main>
    </div>
  );
}

export default App;