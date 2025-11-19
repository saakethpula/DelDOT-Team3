import { Controller, Get, Param, Query } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { ComplaintCreateIn } from '@repo/api/complaints/dto/complaints.dto';
import { Post, Body } from '@nestjs/common';
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

    @Post()
    create(@Body() createComplaint: ComplaintCreateIn) {
        return this.complaintService.create(createComplaint);
    }

    
}
