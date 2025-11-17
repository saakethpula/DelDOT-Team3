import { DocumentService } from './document.service';
export declare class DocumentController {
    private documentService;
    constructor(documentService: DocumentService);
    findAll(): import("@repo/database").Prisma.PrismaPromise<{
        id: string;
        complaintId: string;
        fileName: string;
        fileType: string | null;
        fileSize: number | null;
        url: string | null;
        notes: string | null;
        uploadedAt: Date;
    }[]>;
    findOne(id: string): import("@repo/database").Prisma.Prisma__DocumentClient<{
        id: string;
        complaintId: string;
        fileName: string;
        fileType: string | null;
        fileSize: number | null;
        url: string | null;
        notes: string | null;
        uploadedAt: Date;
    }, null, import("@repo/database/generated/client/runtime/library").DefaultArgs, import("@repo/database").Prisma.PrismaClientOptions>;
}
//# sourceMappingURL=document.controller.d.ts.map