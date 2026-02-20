import { PrismaService } from 'src/prisma.service';
export declare class DocumentService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        complaintId: string;
        fileName: string;
        fileType: string | null;
        fileSize: number | null;
        url: string | null;
        notes: string | null;
        uploadedAt: Date;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__DocumentClient<{
        id: string;
        complaintId: string;
        fileName: string;
        fileType: string | null;
        fileSize: number | null;
        url: string | null;
        notes: string | null;
        uploadedAt: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
//# sourceMappingURL=document.service.d.ts.map