import { DocumentService } from './document.service';
export declare class DocumentController {
    private documentService;
    constructor(documentService: DocumentService);
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
//# sourceMappingURL=document.controller.d.ts.map