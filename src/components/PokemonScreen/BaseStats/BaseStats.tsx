import { Divider, Progress } from "@chakra-ui/react";
import "./styles.css";

function BaseStats() {
  return (
    <div className="stats">
      <div className="name">
        <p>HP</p>
        <p>ATK</p>
        <p>DEF</p>
        <p>SATK</p>
        <p>SDEF</p>
        <p>SPD</p>
      </div>
      <Divider orientation="vertical" />
      <div className="number">
        <p>999</p>
        <p>999</p>
        <p>999</p>
        <p>999</p>
        <p>999</p>
        <p>999</p>
      </div>
      <div className="progress">
        <Progress
          value={60}
          size={"xs"}
          colorScheme="gray"
          borderRadius={"10px"}
        />
        <Progress
          value={60}
          size={"xs"}
          colorScheme="gray"
          borderRadius={"10px"}
        />
        <Progress
          value={60}
          size={"xs"}
          colorScheme="gray"
          borderRadius={"10px"}
        />
        <Progress
          value={60}
          size={"xs"}
          colorScheme="gray"
          borderRadius={"10px"}
        />
        <Progress
          value={60}
          size={"xs"}
          colorScheme="gray"
          borderRadius={"10px"}
        />
        <Progress
          value={60}
          size={"xs"}
          colorScheme="gray"
          borderRadius={"10px"}
        />
      </div>
    </div>
  );
}

export default BaseStats;
