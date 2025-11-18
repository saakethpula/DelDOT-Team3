"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ComplaintService = class ComplaintService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.complaint.findMany();
    }
    findOne(id) {
        return this.prisma.complaint.findUnique({
            where: { id }
        });
    }
    async create(createComplaint) {
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
};
exports.ComplaintService = ComplaintService;
exports.ComplaintService = ComplaintService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ComplaintService);
//# sourceMappingURL=complaint.service.js.map