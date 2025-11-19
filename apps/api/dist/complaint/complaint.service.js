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
    async create(dto) {
        try {
            console.log('Received DTO:', JSON.stringify(dto, null, 2));
            const { vin, year, make, model, color, plateNumber, plateOrUtitle, signatureConfirmed, ...rest } = dto;
            const cleanData = {};
            for (const [key, value] of Object.entries(rest)) {
                if (key === 'customerName') {
                    cleanData[key] = value;
                }
                else if (value === '' || value === null) {
                    cleanData[key] = undefined;
                }
                else {
                    cleanData[key] = value;
                }
            }
            console.log('Cleaned data:', JSON.stringify(cleanData, null, 2));
            const caseNumber = `CASE-${Date.now()}`;
            const hasVehicleData = vin || year || make || model || color || plateNumber || plateOrUtitle;
            const complaintData = {
                ...cleanData,
                caseNumber,
                dateReceived: new Date(),
            };
            if (hasVehicleData) {
                complaintData.vehicle = {
                    create: {
                        vin: vin || undefined,
                        year: year ? parseInt(year) : undefined,
                        make: make || undefined,
                        model: model || undefined,
                        color: color || undefined,
                        plateNumber: plateNumber || undefined,
                        plateOrUtitle: plateOrUtitle || undefined,
                    }
                };
            }
            console.log('Final complaint data:', JSON.stringify(complaintData, null, 2));
            const complaint = await this.prisma.complaint.create({
                data: complaintData,
                include: {
                    vehicle: true,
                    documents: true,
                },
            });
            console.log('Complaint created successfully:', complaint.id);
            return complaint;
        }
        catch (error) {
            console.error('Error creating complaint:', error);
            throw error;
        }
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