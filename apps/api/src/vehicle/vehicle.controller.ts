import { Controller, Get, Param } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
@Controller('vehicle')
export class VehicleController {
    constructor(private vehicleService: VehicleService) { }

    @Get()
    findAll() {
        return this.vehicleService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.vehicleService.findOne(id);
    }
}
