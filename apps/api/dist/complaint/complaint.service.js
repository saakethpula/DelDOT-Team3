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
        return this.prisma.complaint.findMany({
            include: {
                vehicle: true,
                documents: true
            }
        });
    }
    search(query) {
        const where = {};
        if (query.caseNumber)
            where.caseNumber = { contains: query.caseNumber, mode: 'insensitive' };
        if (query.customerName)
            where.customerName = { contains: query.customerName, mode: 'insensitive' };
        if (query.customerEmail)
            where.customerEmail = { contains: query.customerEmail, mode: 'insensitive' };
        if (query.respondentName)
            where.respondentName = { contains: query.respondentName, mode: 'insensitive' };
        if (query.status)
            where.status = query.status;
        if (query.investigator)
            where.investigator = { contains: query.investigator, mode: 'insensitive' };
        if (query.complaintType)
            where.complaintType = { contains: query.complaintType, mode: 'insensitive' };
        if (query.dateReceivedFrom || query.dateReceivedTo) {
            where.dateReceived = {};
            if (query.dateReceivedFrom)
                where.dateReceived.gte = new Date(query.dateReceivedFrom);
            if (query.dateReceivedTo)
                where.dateReceived.lte = new Date(query.dateReceivedTo);
        }
        return this.prisma.complaint.findMany({
            where,
            include: {
                vehicle: true,
                documents: true
            }
        });
    }
    findOne(id) {
        return this.prisma.complaint.findUnique({
            where: { id },
            include: {
                vehicle: true,
                documents: true
            }
        });
    }
    update(id, updateData) {
        return this.prisma.complaint.update({
            where: { id },
            data: updateData
        });
    }
};
exports.ComplaintService = ComplaintService;
exports.ComplaintService = ComplaintService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ComplaintService);
//# sourceMappingURL=complaint.service.js.map