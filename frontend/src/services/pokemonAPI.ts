import axios from "axios";

export default class PokemonAPI {
  static async fetchPokemons() {
    const response = await axios.get("http://localhost:5000/api/pokemon");
    return response.data;
  }

  static async getPokemonById(id: number) {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/pokemon/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Pokemon request error: ", error);
    }
  }
}
