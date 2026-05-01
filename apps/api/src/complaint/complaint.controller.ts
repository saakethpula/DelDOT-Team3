import { Controller, Get, Param, Patch, Body, Query } from '@nestjs/common';
import { ComplaintService } from './complaint.service';

@Controller('complaint')
export class ComplaintController {
    constructor(private complaintService: ComplaintService) { }

    @Get()
    findAll() {
        return this.complaintService.findAll();
    }

    @Get('search')
    search(@Query() query: any) {
        return this.complaintService.search(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.complaintService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateData: any) {
        return this.complaintService.update(id, updateData);
    }
}
