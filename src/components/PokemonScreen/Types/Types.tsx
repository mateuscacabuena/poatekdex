import "./styles.css";
import { usePokemonContext } from "../../../hooks/usePokemonContext";

function Types() {
  const { pokemon } = usePokemonContext();
  const firstType = pokemon.types[0];
  const secondType = pokemon?.types[1];

  return (
    <div className="Types">
      {firstType && <div className={`type ${firstType}`}>{`${firstType}`}</div>}
      {secondType && <div className={`type ${secondType}`}>{`${secondType}`}</div>}
    </div>
  );
}

export default Types;
