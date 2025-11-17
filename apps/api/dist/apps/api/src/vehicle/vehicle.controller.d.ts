import { VehicleService } from './vehicle.service';
export declare class VehicleController {
    private vehicleService;
    constructor(vehicleService: VehicleService);
    findAll(): import("@repo/database").Prisma.PrismaPromise<{
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
    findOne(id: string): import("@repo/database").Prisma.Prisma__VehicleClient<{
        id: string;
        vin: string | null;
        year: number | null;
        make: string | null;
        model: string | null;
        color: string | null;
        plateNumber: string | null;
        plateOrUtitle: string | null;
        complaintId: string;
    }, null, import("@repo/database/generated/client/runtime/library").DefaultArgs, import("@repo/database").Prisma.PrismaClientOptions>;
}
//# sourceMappingURL=vehicle.controller.d.ts.map