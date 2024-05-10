import "./App.css";
import SelectTrainer from "./trainer";
import poatek from "./assets/poatek.png";

function App() {

  return (
    <div className="App">
      <header>
        <div className="title">
          <img src={poatek} alt={"poatek logo"} />
          <h1>Welcome to Poatekdex!</h1>
        </div>
        <p>Choose the pokédex you want access:</p>
      </header>
      <SelectTrainer />
    </div>
  );
}

export default App;