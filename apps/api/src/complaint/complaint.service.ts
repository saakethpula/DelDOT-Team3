import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ComplaintCreateIn,ComplaintOut } from '@repo/api/complaints/dto/complaints.dto';


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
    async create(createComplaint: ComplaintCreateIn):Promise<ComplaintOut> {
        const complaint = await this.prisma.complaint.create({
            data: createComplaint
        });
        return {
           customerName: complaint.customerName,
           customerPhone: complaint.customerPhone,
           customerEmail: complaint.customerEmail,
           customerAddress: complaint.customerAddress,
           customerCity: complaint.customerCity,
           customerState: complaint.customerState,
           customerZip: complaint.customerZip,
           respondentName: complaint.respondentName,
           respondentPhone: complaint.respondentPhone,
           respondentAddress: complaint.respondentAddress,
           respondentCity: complaint.respondentCity,
           respondentState: complaint.respondentState,
           respondentZip: complaint.respondentZip,
           dealershipRep: complaint.dealershipRep,
           complaintType: complaint.complaintType,
           explainComplaint: complaint.explainComplaint,
           signatureName: complaint.signatureName,
           signatureDate: complaint.signatureDate,
           dmvRepresentative: complaint.dmvRepresentative,
           dmvRepresentativeDate: complaint.dmvRepresentativeDate,
           dmvSupervisor: complaint.dmvSupervisor,
           dmvSupervisorDate: complaint.dmvSupervisorDate,
           caseNumber: complaint.caseNumber,
           dateReceived: complaint.dateReceived,
           investigator: complaint.investigator,
           status: complaint.status,
           createdAt: complaint.createdAt,
           updatedAt: complaint.updatedAt,
        };
    }
}

