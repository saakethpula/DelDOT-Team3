import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ComplaintCreateIn,ComplaintOut } from '../../../../packages/api/src/complaints/dto/complaints.dto';


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

