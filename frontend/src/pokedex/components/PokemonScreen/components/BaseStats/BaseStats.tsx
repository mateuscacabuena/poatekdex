import { Divider, Progress } from "@chakra-ui/react";
import "./styles.css";
import { usePokemonContext } from "../../../../../hooks/usePokemonContext";

function BaseStats() {
  const { pokemon } = usePokemonContext();

  function colorScheme(base_stat: number) {
    if (base_stat < 30) return "red";
    if (base_stat < 60) return "orange";
    if (base_stat < 90) return "yellow";
    if (base_stat < 120) return "green";
    return "blue";
  }

  return (
    <div className="stats" data-cy="pokemon-stats">
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
          <p key={stat.name}>{stat.base_stat}</p>
        ))}
      </div>
      <div className="progress">
        {pokemon.stats.map((stat) => (
          <Progress
            key={stat.name}
            value={Number(stat.base_stat)}
            max={255}
            size={"xs"}
            hasStripe
            isAnimated
            colorScheme={colorScheme(stat.base_stat)}
            borderRadius={"10px"}
          />
        ))}
      </div>
    </div>
  );
}

export default BaseStats;
