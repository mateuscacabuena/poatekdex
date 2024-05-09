import weight from "../../../../assets/weight.svg";
import straighten from "../../../../assets/straighten.svg";
import "./styles.css";
import { Divider } from "@chakra-ui/react";
import { usePokemonContext } from "../../../../hooks/usePokemonContext";

function About() {
  const { pokemon } = usePokemonContext();

  return (
    <div className="About">
      <div className="attribute-content">
        <div className="attribute">
          <div className="weight">
            <div className="attribute-icon">
              <img src={weight} alt="weight" />
            </div>
            <p>{pokemon.weight} kg</p>
          </div>
          <p className="attribute-name">Weight</p>
        </div>
        <Divider orientation="vertical" />
        <div className="attribute">
          <div className="height">
            <div className="attribute-icon">
              <img
                src={straighten}
                alt="straighten"
                style={{ transform: "rotate(90deg)" }}
              />
            </div>
            <p>{pokemon.height} m</p>
          </div>
          <p className="attribute-name">Height</p>
        </div>
        <Divider orientation="vertical" />
        <div className="attribute">
          <div className="ability">
            {pokemon.abilities.map((ability) => (
              <p key={String(ability)}>{ability}</p>
            ))}
          </div>
          <p className="attribute-name">Moves</p>
        </div>
      </div>
    </div>
  );
}

export default About;
