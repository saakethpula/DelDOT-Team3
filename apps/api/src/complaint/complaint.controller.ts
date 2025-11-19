import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
@Controller('complaint')
export class ComplaintController {
    constructor(private readonly complaintService: ComplaintService) { }

    @Post()
    create(@Body() createComplaintDto: any) {
        return this.complaintService.create(createComplaintDto);
    }

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