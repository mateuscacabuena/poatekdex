import { Injectable } from "@nestjs/common";

@Injectable()
export class PokemonRepository {
    getHello(): string {
        return 'Hello World (repository)!';
    }
}