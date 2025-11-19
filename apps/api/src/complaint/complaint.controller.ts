<<<<<<< HEAD
import { Controller, Get, Param,Post,Body } from '@nestjs/common';
=======
import { Controller, Get, Param, Query } from '@nestjs/common';
>>>>>>> 104edcc3e03e1e07787e0189932ce5db7510d3bd
import { ComplaintService } from './complaint.service';
import { ComplaintCreateIn } from '@repo/api/complaints/dto/complaints.dto';
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
