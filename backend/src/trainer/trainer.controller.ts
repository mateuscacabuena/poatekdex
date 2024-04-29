import { Controller, Get, Post, Body, Put, NotFoundException } from "@nestjs/common";
import { TrainerService } from "./trainer.service";
import { CreateTrainerDto } from "./dto/create-trainer.dto";

@Controller('trainer')
export class TrainerController {
    constructor(private readonly trainerService: TrainerService) {}

    @Get()
    findAll() {
        return this.trainerService.findAll();
    }
    
    @Post()
    create(@Body() CreateTrainerDto: CreateTrainerDto) {
        return this.trainerService.insertOne(CreateTrainerDto);
    }

    @Get(':id')
    async findOne(id: string) {
        const result = await this.trainerService.findOne(id);

        if (!result) throw new NotFoundException();
    }

    @Put(':id')
    updateOne(id: string, @Body() CreateTrainerDto: CreateTrainerDto) {
        return this.trainerService.updateOne(id, CreateTrainerDto);
    }
}