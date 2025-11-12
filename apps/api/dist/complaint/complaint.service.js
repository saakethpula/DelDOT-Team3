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
                documents: true,
            },
        });
    }
    findOne(id) {
        return this.prisma.complaint.findUnique({
            where: { id },
            include: {
                vehicle: true,
                documents: true,
            },
        });
    }
    async search(filters) {
        const where = {};
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
};
exports.ComplaintService = ComplaintService;
exports.ComplaintService = ComplaintService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ComplaintService);
//# sourceMappingURL=complaint.service.js.map