import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ComplaintService {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.complaint.findMany();
    }
    findOne(id: string) {
        return this.prisma.complaint.findUnique({
            where: { id }
        });
    }
}

