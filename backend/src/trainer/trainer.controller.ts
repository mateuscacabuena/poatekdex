import { Controller, Get, Post, Body, Put, NotFoundException, Param, Delete } from "@nestjs/common";
import { TrainerService } from "./trainer.service";
import { TrainerDto } from "./trainer.dto";

@Controller('trainer')
export class TrainerController {
    constructor(private readonly trainerService: TrainerService) {}

    @Get()
    findAll() {
        return this.trainerService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const result = await this.trainerService.findOne(id);

        if (!result) throw new NotFoundException();
        
        return result
    }

    @Post()
    async create(@Body() trainerDto: TrainerDto) {
        const result = await this.trainerService.insertOne(trainerDto);

        if (!result) throw new NotFoundException();

        return 'Trainer successfully created!'
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() trainerDto: TrainerDto) {
        const result = this.trainerService.updateOne(id, trainerDto);

        if (!result) throw new NotFoundException();

        return 'Trainer successfully updated!';
    }

    @Delete(':id')
    async deleteOne(@Param('id') id: string) {
        const result = await this.trainerService.deleteOne(id);

        if (!result) throw new NotFoundException();

        return 'Trainer successfully deleted!';
    }
}