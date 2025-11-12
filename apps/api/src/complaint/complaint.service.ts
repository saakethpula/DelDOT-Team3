import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ComplaintService {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.complaint.findMany({
            include: {
                vehicle: true,
                documents: true,
            },
        });
    }

    findOne(id: string) {
        return this.prisma.complaint.findUnique({
            where: { id },
            include: {
                vehicle: true,
                documents: true,
            },
        });
    }

    async search(filters: any) {
        const where: any = {};

        // Exact match filters
        if (filters.caseNumber) {
            where.caseNumber = { contains: filters.caseNumber, mode: 'insensitive' };
        }
        if (filters.customerName) {
            where.customerName = { contains: filters.customerName, mode: 'insensitive' };
        }
        if (filters.customerEmail) {
            where.customerEmail = { contains: filters.customerEmail, mode: 'insensitive' };
        }
        if (filters.respondentName) {
            where.respondentName = { contains: filters.respondentName, mode: 'insensitive' };
        }
        if (filters.status) {
            where.status = filters.status;
        }
        if (filters.investigator) {
            where.investigator = { contains: filters.investigator, mode: 'insensitive' };
        }
        if (filters.complaintType) {
            where.complaintType = { contains: filters.complaintType, mode: 'insensitive' };
        }

        // Date range filter
        if (filters.dateReceivedFrom || filters.dateReceivedTo) {
            where.dateReceived = {};
            if (filters.dateReceivedFrom) {
                where.dateReceived.gte = new Date(filters.dateReceivedFrom);
            }
            if (filters.dateReceivedTo) {
                where.dateReceived.lte = new Date(filters.dateReceivedTo);
            }
        }

        return this.prisma.complaint.findMany({
            where,
            include: {
                vehicle: true,
                documents: true,
            },
            orderBy: {
                dateReceived: 'desc',
            },
        });
    }
}

