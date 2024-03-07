import { Divider, Progress } from "@chakra-ui/react";
import "./styles.css";
import { usePokemonContext } from "../../../hooks/usePokemonContext";

function BaseStats() {
  const { pokemon } = usePokemonContext();

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
        {pokemon.stats.map((stat) => (
          <p key={stat.stat.name}>{stat.base_stat}</p>
        ))}
      </div>
      <div className="progress">
        {pokemon.stats.map((stat) => (
          <Progress
            key={stat.stat.name}
            value={Number(stat.base_stat)}
            max={255}
            size={"xs"}
            colorScheme={
              Number(stat.base_stat) >= 100
                ? "green"
                : Number(stat.base_stat) >= 60
                ? "yellow"
                : "red"
            }
            borderRadius={"10px"}
          />
        ))}
      </div>
    </div>
  );
}

export default BaseStats;
