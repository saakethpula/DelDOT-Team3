import { Controller, Get, Param,Post,Body } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { ComplaintUpdateIn,ComplaintRef,ComplaintCreateIn } from '../../../../packages/api/src/complaints/dto/complaints.dto';
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

    @Post()
    create(@Body() createComplaint: ComplaintCreateIn) {
        return this.complaintService.create(createComplaint);
    }

    
}
