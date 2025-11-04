import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VehicleService {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.vehicle.findMany();
    }
    findOne(id: string) {
        return this.prisma.vehicle.findUnique({
            where: { id }
        });
    }
}

