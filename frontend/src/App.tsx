import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  function handleTrainer(trainer: string) {
    console.log(`Trainer ${trainer} selected!`);
    navigate(`/pokedex`);
  }

  return (
    <div className="App">
      <header className="trainer-header">
        <h1>Bem-vindo à Poatekdex!</h1>
        <p>Escolha a Pokedex que deseja acessar:</p>
      </header>
      <main className="trainer-content">
        <p onClick={() => handleTrainer('ash')}>*treinadores*</p>
      </main>
    </div>
  );
}

export default App;
