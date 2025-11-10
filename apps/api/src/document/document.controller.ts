import { Controller, Get, Param } from '@nestjs/common';
import { DocumentService } from './document.service';
@Controller('document')
export class DocumentController {
    constructor(private documentService: DocumentService) { }

    @Get()
    findAll() {
        return this.documentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.documentService.findOne(id);
    }
}
