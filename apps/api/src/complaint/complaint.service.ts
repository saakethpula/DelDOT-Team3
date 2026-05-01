import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ComplaintService {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.complaint.findMany({
            include: {
                vehicle: true,
                documents: true
            }
        });
    }

    search(query: any) {
        const where: any = {};
        if (query.caseNumber) where.caseNumber = { contains: query.caseNumber, mode: 'insensitive' };
        if (query.customerName) where.customerName = { contains: query.customerName, mode: 'insensitive' };
        if (query.customerEmail) where.customerEmail = { contains: query.customerEmail, mode: 'insensitive' };
        if (query.respondentName) where.respondentName = { contains: query.respondentName, mode: 'insensitive' };
        if (query.status) where.status = query.status;
        if (query.investigator) where.investigator = { contains: query.investigator, mode: 'insensitive' };
        if (query.complaintType) where.complaintType = { contains: query.complaintType, mode: 'insensitive' };
        if (query.dateReceivedFrom || query.dateReceivedTo) {
            where.dateReceived = {};
            if (query.dateReceivedFrom) where.dateReceived.gte = new Date(query.dateReceivedFrom);
            if (query.dateReceivedTo) where.dateReceived.lte = new Date(query.dateReceivedTo);
        }
        return this.prisma.complaint.findMany({ 
            where,
            include: {
                vehicle: true,
                documents: true
            }
        });
    }

    findOne(id: string) {
        return this.prisma.complaint.findUnique({
            where: { id },
            include: {
                vehicle: true,
                documents: true
            }
        });
    }

    update(id: string, updateData: any) {
        return this.prisma.complaint.update({
            where: { id },
            data: updateData
        });
    }
}

