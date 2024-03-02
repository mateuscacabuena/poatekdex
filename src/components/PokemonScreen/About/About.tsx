import weight from "../../../assets/weight.svg";
import straighten from "../../../assets/straighten.svg";
import "./styles.css";
import { Divider } from "@chakra-ui/react";

function About() {
  return (
    <div className="About">
      <div className="attribute-content">
        <div className="attribute">
          <div className="weight">
            <div className="attribute-icon">
              <img src={weight} alt="weight" />
            </div>
            <p>9,9 kg</p>
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
            <p>9,9 m</p>
          </div>
          <p className="attribute-name">Height</p>
        </div>
        <Divider orientation="vertical" />
        <div className="attribute">
          <div className="ability">
            <p>Ability 1</p>
            <p>Ability 2</p>
          </div>
          <p className="attribute-name">Moves</p>
        </div>
      </div>
    </div>
  );
}

export default About;
