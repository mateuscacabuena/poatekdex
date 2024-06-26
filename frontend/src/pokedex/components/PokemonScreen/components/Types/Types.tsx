import "./styles.css";
import { usePokemonContext } from "../../../../../hooks/usePokemonContext";

function Types() {
  const { pokemon } = usePokemonContext();

  return (
    <div className="Types" data-cy="pokemon-types">
      {pokemon.types.map((type) => (
        <div className={`type ${type}`} key={type.toString()}>
          {type}
        </div>
      ))}
    </div>
  );
}

export default Types;
