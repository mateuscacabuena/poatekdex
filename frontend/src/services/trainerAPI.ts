import { Trainer } from "../interface/interfaces";
import axios from "axios";

export default class TrainerAPI {
  static async getTrainerList() {
    const response = await axios.get("http://localhost:5000/api/trainer");
    return response.data;
  }

  static async getTrainerById(id: number) {
    const response = await axios.get(`http://localhost:5000/api/trainer/${id}`);
    return response.data;
  }

  static async createTrainer(trainer: Trainer) {
    const response = await axios.post(
      "http://localhost:5000/api/trainer",
      trainer
    );
    return response.data;
  }

  static async updateTrainer(id: number, trainer: Trainer) {
    const response = await axios.put(
      `http://localhost:5000/api/trainer/${id}`,
      trainer
    );
    return response.data;
  }

  static async deleteTrainer(id: number) {
    const response = await axios.delete(
      `http://localhost:5000/api/trainer/${id}`
    );
    return response.data;
  }
}
