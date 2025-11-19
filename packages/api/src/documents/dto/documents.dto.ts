import {z} from 'zod';
import { Pagination } from '../../queries';

/*
model Document {
  id           String   @id @default(cuid())
  fileName     String
  fileType     String?
  fileSize     Int?
  url          String?  // where the uploaded copy is stored (S3, local path, etc.)
  notes        String?

  complaint    Complaint @relation(fields: [complaintId], references: [id])
  complaintId  String
  uploadedAt   DateTime   @default(now())
}
*/
export const DocumentRef = z.object({
    id: z.number(),
  });
  export type DocumentRef = z.infer<typeof DocumentRef>;
  
  // =========================
  // Output DTO (API responses)
  // =========================
  export const DocumentOut = z.object({
    id: z.string(),
    fileName: z.string(),
    fileType: z.string().nullable(),
    fileSize: z.number().int().nullable(),
    url: z.string().nullable(),
    notes: z.string().nullable(),
    complaintId: z.string(),
    uploadedAt: z.date(),

  });
  
  export type DocumentOut = z.infer<typeof DocumentOut>;
  
  // =========================
  // Creation DTO (API request body)
  // =========================
  export const DocumentCreateIn = z.object({
    id: z.string(),
    fileName: z.string(),
    fileType: z.string().nullable(),
    fileSize: z.number().int().nullable(),
    url: z.string().nullable(),
    notes: z.string().nullable(),
    complaintId: z.string(),
    uploadedAt: z.date(),
  });
  export type DocumentCreateIn = z.infer<typeof DocumentCreateIn>;
  
  // =========================
  // Update DTO (API request body)
  // =========================
  export const DocumentUpdateIn = z.object({
    id: z.string(),
    fileName: z.string(),
    fileType: z.string().nullable(),
    fileSize: z.number().int().nullable(),
    url: z.string().nullable(),
    notes: z.string().nullable(),
    complaintId: z.string(),
    uploadedAt: z.date(),
  });
  export type DocumentUpdateIn = z.infer<typeof DocumentUpdateIn>;
  
  // =========================
  // Query DTO (API query parameters)
  // =========================
  export const DocumentsListFilter = Pagination.extend({
    id: z.string(),
    fileName: z.string(),
    fileType: z.string().nullable(),
    fileSize: z.number().int().nullable(),
    url: z.string().nullable(),
    notes: z.string().nullable(),
    complaintId: z.string(),
    uploadedAt: z.date(),
  });
  export type DocumentsListFilter = z.infer<typeof DocumentsListFilter>;