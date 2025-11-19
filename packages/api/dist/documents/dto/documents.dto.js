"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/documents/dto/documents.dto.ts
var documents_dto_exports = {};
__export(documents_dto_exports, {
  DocumentCreateIn: () => DocumentCreateIn,
  DocumentOut: () => DocumentOut,
  DocumentRef: () => DocumentRef,
  DocumentUpdateIn: () => DocumentUpdateIn,
  DocumentsListFilter: () => DocumentsListFilter
});
module.exports = __toCommonJS(documents_dto_exports);
var import_zod2 = require("zod");

// src/queries.ts
var import_zod = require("zod");
var Pagination = import_zod.z.object({
  limit: import_zod.z.number().int().positive().max(100).default(20),
  offset: import_zod.z.number().int().nonnegative().default(0)
});

// src/documents/dto/documents.dto.ts
var DocumentRef = import_zod2.z.object({
  id: import_zod2.z.number()
});
var DocumentOut = import_zod2.z.object({
  id: import_zod2.z.string(),
  fileName: import_zod2.z.string(),
  fileType: import_zod2.z.string().nullable(),
  fileSize: import_zod2.z.number().int().nullable(),
  url: import_zod2.z.string().nullable(),
  notes: import_zod2.z.string().nullable(),
  complaintId: import_zod2.z.string(),
  uploadedAt: import_zod2.z.date()
});
var DocumentCreateIn = import_zod2.z.object({
  id: import_zod2.z.string(),
  fileName: import_zod2.z.string(),
  fileType: import_zod2.z.string().nullable(),
  fileSize: import_zod2.z.number().int().nullable(),
  url: import_zod2.z.string().nullable(),
  notes: import_zod2.z.string().nullable(),
  complaintId: import_zod2.z.string(),
  uploadedAt: import_zod2.z.date()
});
var DocumentUpdateIn = import_zod2.z.object({
  id: import_zod2.z.string(),
  fileName: import_zod2.z.string(),
  fileType: import_zod2.z.string().nullable(),
  fileSize: import_zod2.z.number().int().nullable(),
  url: import_zod2.z.string().nullable(),
  notes: import_zod2.z.string().nullable(),
  complaintId: import_zod2.z.string(),
  uploadedAt: import_zod2.z.date()
});
var DocumentsListFilter = Pagination.extend({
  id: import_zod2.z.string(),
  fileName: import_zod2.z.string(),
  fileType: import_zod2.z.string().nullable(),
  fileSize: import_zod2.z.number().int().nullable(),
  url: import_zod2.z.string().nullable(),
  notes: import_zod2.z.string().nullable(),
  complaintId: import_zod2.z.string(),
  uploadedAt: import_zod2.z.date()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DocumentCreateIn,
  DocumentOut,
  DocumentRef,
  DocumentUpdateIn,
  DocumentsListFilter
});
