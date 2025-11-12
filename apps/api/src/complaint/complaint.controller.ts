import { Controller, Get, Param, Query } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
@Controller('complaint')
export class ComplaintController {
    constructor(private readonly complaintService: ComplaintService) { }

    @Get()
    findAll() {
        return this.complaintService.findAll();
    }

    @Get('search')
    search(@Query() filters: any) {
        return this.complaintService.search(filters);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.complaintService.findOne(id);
    }
}
