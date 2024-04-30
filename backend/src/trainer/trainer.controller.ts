import { Controller, Get, Post, Body, Put, NotFoundException, Param, Delete } from "@nestjs/common";
import { TrainerService } from "./trainer.service";
import { CreateTrainerDto } from "./dto/create-trainer.dto";
import { UpdateTrainerDto } from "./dto/update-trainer.dto";

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
    async create(@Body() createTrainerDto: CreateTrainerDto) {
        const result = await this.trainerService.insertOne(createTrainerDto);

        if (!result) throw new NotFoundException();

        return 'Trainer successfully created!'
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() updateTrainerDto: UpdateTrainerDto) {
        const result = this.trainerService.updateOne(id, updateTrainerDto);

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