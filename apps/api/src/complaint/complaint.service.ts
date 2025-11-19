import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ComplaintService {
    constructor(private prisma: PrismaService) { }

    async create(dto: any) {
        try {
            console.log('Received DTO:', JSON.stringify(dto, null, 2));
            
            const { vin, year, make, model, color, plateNumber, plateOrUtitle, signatureConfirmed, ...rest } = dto;

            // Clean up empty strings and convert to undefined for nullable fields (except required customerName)
            const cleanData: any = {};
            for (const [key, value] of Object.entries(rest)) {
                if (key === 'customerName') {
                    cleanData[key] = value; // Keep customerName as is (required field)
                } else if (value === '' || value === null) {
                    cleanData[key] = undefined; // Convert empty strings to undefined for optional fields
                } else {
                    cleanData[key] = value;
                }
            }

            console.log('Cleaned data:', JSON.stringify(cleanData, null, 2));

            // Generate case number
            const caseNumber = `CASE-${Date.now()}`;

            // Check if vehicle data exists
            const hasVehicleData = vin || year || make || model || color || plateNumber || plateOrUtitle;

            const complaintData: any = {
                ...cleanData,
                caseNumber,
                dateReceived: new Date(),
            };

            if (hasVehicleData) {
                complaintData.vehicle = {
                    create: {
                        vin: vin || undefined,
                        year: year ? parseInt(year as string) : undefined,
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
        } catch (error) {
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
