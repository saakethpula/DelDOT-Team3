import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DocumentService {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.document.findMany();
    }
    findOne(id: string) {
        return this.prisma.document.findUnique({
            where: { id }
        });
    }
}

