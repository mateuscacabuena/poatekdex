import { Controller, Get, Post, Body, Put, NotFoundException, Param, Delete } from "@nestjs/common";
import { TrainerService } from "../service/trainer.service";
import { TrainerDto } from "../trainer.dto";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('trainer')
@Controller('trainer')
export class TrainerController {
    constructor(private readonly trainerService: TrainerService) {}

    @Get()
    findAll() {
        const result =  this.trainerService.findAll();

        if (!result) throw new NotFoundException();

        return result;
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const result = await this.trainerService.findOne(id);

        if (!result) throw new NotFoundException();
        
        return result
    }

    @Post()
    async create(@Body() trainerDto: TrainerDto) {
        const trainers = await this.trainerService.findAll();
        const newId = trainers.length + 1;
        const newTrainer = { id: newId, ...trainerDto };

        return this.trainerService.insertOne(newTrainer);
    }

    @Put(':id')
    async updateOne(@Param('id') id: string, @Body() trainerDto: TrainerDto) {
        const result = await this.trainerService.updateOne(id, trainerDto);

        if (!result) throw new NotFoundException();

        return result;
    }

    @Delete(':id')
    async deleteOne(@Param('id') id: string) {
        const result = await this.trainerService.deleteOne(id);

        if (!result) throw new NotFoundException();

        return 'Trainer successfully deleted!';
    }
}