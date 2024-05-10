import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useTrainerContext } from "../hooks/useTrainerContext";
import user from "../assets/user.png";
import { Trainer } from "../interface/interfaces";
import { IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import CreateTrainerButton from "./components/CreateTrainerButton/CreateTrainerButton";

function SelectTrainer() {
  const navigate = useNavigate();
  const { trainerList, excludeTrainer, setTrainer } = useTrainerContext();

  function handleTrainer(trainer: Trainer) {
    setTrainer(trainer);
    navigate(`/pokedex`);
  }

  return (
    <main className="trainer-content">
      <div className="trainer-list">
        {trainerList &&
          trainerList.map((trainer) => (
            <div
              className="trainer-card"
              key={trainer.id}
            >
              <div className="trainer-avatar">
                <img src={trainer.imageUrl ?? user} alt={trainer.name} onClick={() => handleTrainer(trainer)}/>
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
      <CreateTrainerButton />
    </main>
  );
}

export default SelectTrainer;