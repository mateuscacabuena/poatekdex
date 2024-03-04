import './styles.css'
import pokeball from '../../assets/pokeball.svg'

function Title() {
  return (
    <div className="Title">
        <img src={pokeball} alt="pokeball" />
        <h1>Pokédex</h1>
    </div>
  )
}

export default Title