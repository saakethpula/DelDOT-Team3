import { Controller, Get, Param } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
@Controller('complaint')
export class ComplaintController {
    constructor(private complaintService: ComplaintService) { }

    @Get()
    findAll() {
        return this.complaintService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.complaintService.findOne(id);
    }
}
