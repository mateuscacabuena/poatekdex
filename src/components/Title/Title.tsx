import './styles.css'
import pokeball from '../../assets/pokeball.svg'

function Title() {
  return (
    <div className="Title">
        <img src={pokeball} className="react-logo" alt="react logo" />
        <h1>Pokédex</h1>
    </div>
  )
}

export default Title