import { Controller, Get } from '@nestjs/common';

@Controller()
export class PokemonController {
    @Get()
    getHello(): string {
        return 'Hello World!(Controller)';
    }
}