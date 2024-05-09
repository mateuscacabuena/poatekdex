import "./App.css";
import { useNavigate } from "react-router-dom";
import { useTrainerContext } from "./hooks/useTrainerContext";
import user from "./assets/user.png";
import poatek from "./assets/poatek.png";
import { Trainer } from "./interface/interfaces";
import { Button, IconButton, Input } from "@chakra-ui/react";
import {
  AddIcon,
  CheckIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";

function App() {
  const navigate = useNavigate();
  const { trainerList, excludeTrainer } = useTrainerContext();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function handleTrainer(trainer: Trainer) {
    localStorage.setItem("trainer", JSON.stringify(trainer));
    navigate(`/pokedex`);
  }

  function createTrainer() {}

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
        <div className="trainer-list">
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
                  size={"sm"}
                  icon={<CloseIcon />}
                  color="#DC0A2D"
                  onClick={() => excludeTrainer(trainer.id)}
                />
              </div>
            ))}
        </div>
        <Popover>
          <PopoverTrigger>
            <Button
              color={"#DC0A2D"}
              leftIcon={<AddIcon />}
              mt={10}
              onClick={() => createTrainer()}
            >
              Create Trainer
            </Button>
          </PopoverTrigger>
          <PopoverContent color="#DC0A2D">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Fill the form below</PopoverHeader>
            <PopoverBody>
              <Input
                placeholder="Trainer Name"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Trainer Image URL"
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </PopoverBody>
            <PopoverFooter>
              <Button
                colorScheme="red"
                color={"white"}
                leftIcon={<CheckIcon />}
              >
                Create
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </main>
    </div>
  );
}

export default App;