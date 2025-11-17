import {
  Pagination
} from "../../chunk-GZ4POAPY.mjs";

// src/documents/dto/documents.dto.ts
import { z } from "zod";
var DocumentRef = z.object({
  id: z.number()
});
var DocumentOut = z.object({
  id: z.string(),
  fileName: z.string(),
  fileType: z.string().nullable(),
  fileSize: z.number().int().nullable(),
  url: z.string().nullable(),
  notes: z.string().nullable(),
  complaintId: z.string(),
  uploadedAt: z.date()
});
var DocumentCreateIn = z.object({
  id: z.string(),
  fileName: z.string(),
  fileType: z.string().nullable(),
  fileSize: z.number().int().nullable(),
  url: z.string().nullable(),
  notes: z.string().nullable(),
  complaintId: z.string(),
  uploadedAt: z.date()
});
var DocumentUpdateIn = z.object({
  id: z.string(),
  fileName: z.string(),
  fileType: z.string().nullable(),
  fileSize: z.number().int().nullable(),
  url: z.string().nullable(),
  notes: z.string().nullable(),
  complaintId: z.string(),
  uploadedAt: z.date()
});
var DocumentsListFilter = Pagination.extend({
  id: z.string(),
  fileName: z.string(),
  fileType: z.string().nullable(),
  fileSize: z.number().int().nullable(),
  url: z.string().nullable(),
  notes: z.string().nullable(),
  complaintId: z.string(),
  uploadedAt: z.date()
});
export {
  DocumentCreateIn,
  DocumentOut,
  DocumentRef,
  DocumentUpdateIn,
  DocumentsListFilter
};
