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

// src/complaints/dto/complaints.dto.ts
var complaints_dto_exports = {};
__export(complaints_dto_exports, {
  ComplaintCreateIn: () => ComplaintCreateIn,
  ComplaintOut: () => ComplaintOut,
  ComplaintRef: () => ComplaintRef,
  ComplaintUpdateIn: () => ComplaintUpdateIn,
  ComplaintsListFilter: () => ComplaintsListFilter
});
module.exports = __toCommonJS(complaints_dto_exports);
var import_zod2 = require("zod");

// src/queries.ts
var import_zod = require("zod");
var Pagination = import_zod.z.object({
  limit: import_zod.z.number().int().positive().max(100).default(20),
  offset: import_zod.z.number().int().nonnegative().default(0)
});

// src/complaints/dto/complaints.dto.ts
var ComplaintRef = import_zod2.z.object({
  id: import_zod2.z.number()
});
var ComplaintOut = import_zod2.z.object({
  customerName: import_zod2.z.string(),
  customerPhone: import_zod2.z.string().nullable(),
  customerEmail: import_zod2.z.string().nullable(),
  customerAddress: import_zod2.z.string().nullable(),
  customerCity: import_zod2.z.string().nullable(),
  customerState: import_zod2.z.string().nullable(),
  customerZip: import_zod2.z.string().nullable(),
  respondentName: import_zod2.z.string().nullable(),
  respondentPhone: import_zod2.z.string().nullable(),
  respondentAddress: import_zod2.z.string().nullable(),
  respondentCity: import_zod2.z.string().nullable(),
  respondentState: import_zod2.z.string().nullable(),
  respondentZip: import_zod2.z.string().nullable(),
  dealershipRep: import_zod2.z.string().nullable(),
  complaintType: import_zod2.z.string().nullable(),
  explainComplaint: import_zod2.z.string().nullable(),
  signatureName: import_zod2.z.string().nullable(),
  signatureDate: import_zod2.z.date().nullable(),
  dmvRepresentative: import_zod2.z.string().nullable(),
  dmvRepresentativeDate: import_zod2.z.date().nullable(),
  dmvSupervisor: import_zod2.z.string().nullable(),
  dmvSupervisorDate: import_zod2.z.date().nullable(),
  caseNumber: import_zod2.z.string().nullable(),
  dateReceived: import_zod2.z.date().nullable(),
  investigator: import_zod2.z.string().nullable(),
  status: import_zod2.z.any(),
  createdAt: import_zod2.z.date(),
  updatedAt: import_zod2.z.date()
});
var ComplaintCreateIn = import_zod2.z.object({
  customerName: import_zod2.z.string(),
  customerPhone: import_zod2.z.string().nullable(),
  customerEmail: import_zod2.z.string().nullable(),
  customerAddress: import_zod2.z.string().nullable(),
  customerCity: import_zod2.z.string().nullable(),
  customerState: import_zod2.z.string().nullable(),
  customerZip: import_zod2.z.string().nullable(),
  respondentName: import_zod2.z.string().nullable(),
  respondentPhone: import_zod2.z.string().nullable(),
  respondentAddress: import_zod2.z.string().nullable(),
  respondentCity: import_zod2.z.string().nullable(),
  respondentState: import_zod2.z.string().nullable(),
  respondentZip: import_zod2.z.string().nullable(),
  dealershipRep: import_zod2.z.string().nullable(),
  complaintType: import_zod2.z.string().nullable(),
  explainComplaint: import_zod2.z.string().nullable(),
  signatureName: import_zod2.z.string().nullable(),
  signatureDate: import_zod2.z.date().nullable(),
  dmvRepresentative: import_zod2.z.string().nullable(),
  dmvRepresentativeDate: import_zod2.z.date().nullable(),
  dmvSupervisor: import_zod2.z.string().nullable(),
  dmvSupervisorDate: import_zod2.z.date().nullable(),
  caseNumber: import_zod2.z.string().nullable(),
  dateReceived: import_zod2.z.date().nullable(),
  investigator: import_zod2.z.string().nullable(),
  status: import_zod2.z.any(),
  createdAt: import_zod2.z.date(),
  updatedAt: import_zod2.z.date()
});
var ComplaintUpdateIn = import_zod2.z.object({
  customerName: import_zod2.z.string(),
  customerPhone: import_zod2.z.string().nullable(),
  customerEmail: import_zod2.z.string().nullable(),
  customerAddress: import_zod2.z.string().nullable(),
  customerCity: import_zod2.z.string().nullable(),
  customerState: import_zod2.z.string().nullable(),
  customerZip: import_zod2.z.string().nullable(),
  respondentName: import_zod2.z.string().nullable(),
  respondentPhone: import_zod2.z.string().nullable(),
  respondentAddress: import_zod2.z.string().nullable(),
  respondentCity: import_zod2.z.string().nullable(),
  respondentState: import_zod2.z.string().nullable(),
  respondentZip: import_zod2.z.string().nullable(),
  dealershipRep: import_zod2.z.string().nullable(),
  complaintType: import_zod2.z.string().nullable(),
  explainComplaint: import_zod2.z.string().nullable(),
  signatureName: import_zod2.z.string().nullable(),
  signatureDate: import_zod2.z.date().nullable(),
  dmvRepresentative: import_zod2.z.string().nullable(),
  dmvRepresentativeDate: import_zod2.z.date().nullable(),
  dmvSupervisor: import_zod2.z.string().nullable(),
  dmvSupervisorDate: import_zod2.z.date().nullable(),
  caseNumber: import_zod2.z.string().nullable(),
  dateReceived: import_zod2.z.date().nullable(),
  investigator: import_zod2.z.string().nullable(),
  status: import_zod2.z.any(),
  createdAt: import_zod2.z.date(),
  updatedAt: import_zod2.z.date()
});
var ComplaintsListFilter = Pagination.extend({
  customerName: import_zod2.z.string(),
  customerPhone: import_zod2.z.string().nullable(),
  customerEmail: import_zod2.z.string().nullable(),
  customerAddress: import_zod2.z.string().nullable(),
  customerCity: import_zod2.z.string().nullable(),
  customerState: import_zod2.z.string().nullable(),
  customerZip: import_zod2.z.string().nullable(),
  respondentName: import_zod2.z.string().nullable(),
  respondentPhone: import_zod2.z.string().nullable(),
  respondentAddress: import_zod2.z.string().nullable(),
  respondentCity: import_zod2.z.string().nullable(),
  respondentState: import_zod2.z.string().nullable(),
  respondentZip: import_zod2.z.string().nullable(),
  dealershipRep: import_zod2.z.string().nullable(),
  complaintType: import_zod2.z.string().nullable(),
  explainComplaint: import_zod2.z.string().nullable(),
  signatureName: import_zod2.z.string().nullable(),
  signatureDate: import_zod2.z.date().nullable(),
  dmvRepresentative: import_zod2.z.string().nullable(),
  dmvRepresentativeDate: import_zod2.z.date().nullable(),
  dmvSupervisor: import_zod2.z.string().nullable(),
  dmvSupervisorDate: import_zod2.z.date().nullable(),
  caseNumber: import_zod2.z.string().nullable(),
  dateReceived: import_zod2.z.date().nullable(),
  investigator: import_zod2.z.string().nullable(),
  status: import_zod2.z.any(),
  createdAt: import_zod2.z.date(),
  updatedAt: import_zod2.z.date()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ComplaintCreateIn,
  ComplaintOut,
  ComplaintRef,
  ComplaintUpdateIn,
  ComplaintsListFilter
});
