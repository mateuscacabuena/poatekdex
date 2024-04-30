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
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.pokemonService.findOne(id);

    if (!result) throw new NotFoundException();

    return result;
  }

  @Post()
  create(@Body() CreatePokemonDto: CreatePokemonDto) {
    const result = this.pokemonService.insertOne(CreatePokemonDto);

    if (!result) throw new NotFoundException();

    return 'Pokemon successfully created!';
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() UpdatePokemonDto: UpdatePokemonDto,
  ) {
    const result = await this.pokemonService.updateOne(id, UpdatePokemonDto);

    if (!result) throw new NotFoundException();

    return 'Pokemon successfully updated!';
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.pokemonService.deleteOne(id);

    if (!result) throw new NotFoundException();

    return 'Pokemon successfully deleted!';
  }
}
