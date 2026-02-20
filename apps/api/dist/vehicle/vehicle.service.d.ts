import { PrismaService } from 'src/prisma.service';
export declare class VehicleService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        vin: string | null;
        year: number | null;
        make: string | null;
        model: string | null;
        color: string | null;
        plateNumber: string | null;
        plateOrUtitle: string | null;
        complaintId: string;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__VehicleClient<{
        id: string;
        vin: string | null;
        year: number | null;
        make: string | null;
        model: string | null;
        color: string | null;
        plateNumber: string | null;
        plateOrUtitle: string | null;
        complaintId: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
//# sourceMappingURL=vehicle.service.d.ts.map