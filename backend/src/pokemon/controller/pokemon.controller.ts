import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PokemonService } from '../service/pokemon.service';
import { PokemonDto } from '../pokemon.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async findAll() {
    const result = this.pokemonService.findAll();

    if (!result) throw new NotFoundException();

    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.pokemonService.findOne(id);

    if (!result) throw new NotFoundException();

    return result;
  }

  @Post()
  async create(@Body() pokemonDto: PokemonDto) {
    const result = await this.pokemonService.insertOne(pokemonDto);

    if (!result) throw new NotFoundException();

    return result;
  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() pokemonDto: PokemonDto) {
    const result = await this.pokemonService.updateOne(id, pokemonDto);

    if (!result) throw new NotFoundException();

    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.pokemonService.deleteOne(id);

    if (!result) throw new NotFoundException();

    return 'Pokemon successfully deleted!';
  }
}
