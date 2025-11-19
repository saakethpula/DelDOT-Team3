import { z } from 'zod';
export declare const DocumentRef: z.ZodObject<{
    id: z.ZodNumber;
}, z.core.$strip>;
export type DocumentRef = z.infer<typeof DocumentRef>;
export declare const DocumentOut: z.ZodObject<{
    id: z.ZodString;
    fileName: z.ZodString;
    fileType: z.ZodNullable<z.ZodString>;
    fileSize: z.ZodNullable<z.ZodNumber>;
    url: z.ZodNullable<z.ZodString>;
    notes: z.ZodNullable<z.ZodString>;
    complaintId: z.ZodString;
    uploadedAt: z.ZodDate;
}, z.core.$strip>;
export type DocumentOut = z.infer<typeof DocumentOut>;
export declare const DocumentCreateIn: z.ZodObject<{
    id: z.ZodString;
    fileName: z.ZodString;
    fileType: z.ZodNullable<z.ZodString>;
    fileSize: z.ZodNullable<z.ZodNumber>;
    url: z.ZodNullable<z.ZodString>;
    notes: z.ZodNullable<z.ZodString>;
    complaintId: z.ZodString;
    uploadedAt: z.ZodDate;
}, z.core.$strip>;
export type DocumentCreateIn = z.infer<typeof DocumentCreateIn>;
export declare const DocumentUpdateIn: z.ZodObject<{
    id: z.ZodString;
    fileName: z.ZodString;
    fileType: z.ZodNullable<z.ZodString>;
    fileSize: z.ZodNullable<z.ZodNumber>;
    url: z.ZodNullable<z.ZodString>;
    notes: z.ZodNullable<z.ZodString>;
    complaintId: z.ZodString;
    uploadedAt: z.ZodDate;
}, z.core.$strip>;
export type DocumentUpdateIn = z.infer<typeof DocumentUpdateIn>;
export declare const DocumentsListFilter: z.ZodObject<{
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
    id: z.ZodString;
    fileName: z.ZodString;
    fileType: z.ZodNullable<z.ZodString>;
    fileSize: z.ZodNullable<z.ZodNumber>;
    url: z.ZodNullable<z.ZodString>;
    notes: z.ZodNullable<z.ZodString>;
    complaintId: z.ZodString;
    uploadedAt: z.ZodDate;
}, z.core.$strip>;
export type DocumentsListFilter = z.infer<typeof DocumentsListFilter>;
//# sourceMappingURL=documents.dto.d.ts.map