import {z} from 'zod';
import { Pagination } from '../../queries';

/*
model Complaint {
  id                         String         @id @default(cuid())
  // Complainant / customer fields
  customerName               String
  customerPhone              String?
  customerEmail              String?
  customerAddress            String?
  customerCity               String?
  customerState              String?
  customerZip                String?

  // Respondent (Business or Individual being complained against)
  respondentName             String?
  respondentPhone            String?
  respondentAddress          String?
  respondentCity             String?
  respondentState            String?
  respondentZip              String?
  dealershipRep              String?        // Dealership representative name (if applicable)

  // Complaint details
  complaintType              String?        // e.g., "Vehicle sale/repair" or other
  explainComplaint           String?        @db.Text

  // Signature & administrative fields
  signatureName              String?
  signatureDate              DateTime?
  dmvRepresentative         String?        // Name/Title/Lane/Station #
  dmvRepresentativeDate     DateTime?
  dmvSupervisor             String?
  dmvSupervisorDate         DateTime?

  // Internal tracking
  caseNumber                 String?        @unique
  dateReceived               DateTime?
  investigator               String?
  status                     ComplaintStatus @default(NEW)

  // Relations
  vehicle                    Vehicle?
  documents                  Document[]

  createdAt                  DateTime       @default(now())
  updatedAt                  DateTime       @updatedAt
}
*/
export const ComplaintRef = z.object({
    id: z.number(),
  });
  export type ComplaintRef = z.infer<typeof ComplaintRef>;
  
  // =========================
  // Output DTO (API responses)
  // =========================
  export const ComplaintOut = z.object({
    id: z.string(),

    customerName: z.string(),
    customerPhone: z.string().nullable(),
    customerEmail: z.string().nullable(),
    customerAddress: z.string().nullable(),
    customerCity: z.string().nullable(),
    customerState: z.string().nullable(),
    customerZip: z.string().nullable(),

    respondentName: z.string().nullable(),
    respondentPhone: z.string().nullable(),
    respondentAddress: z.string().nullable(),
    respondentCity: z.string().nullable(),
    respondentState: z.string().nullable(),
    respondentZip: z.string().nullable(),

    dealershipRep: z.string().nullable(),
    complaintType: z.string().nullable(),
    explainComplaint: z.string().nullable(),

    signatureName: z.string().nullable(),
    signatureDate: z.date().nullable(),

    dmvRepresentative: z.string().nullable(),
    dmvRepresentativeDate: z.date().nullable(),
    dmvSupervisor: z.string().nullable(),
    dmvSupervisorDate: z.date().nullable(),

    caseNumber: z.string().nullable(),
    dateReceived: z.date().nullable(),
    investigator: z.string().nullable(),
    status: z.string(),

    createdAt: z.date(),
    updatedAt: z.date(),

    
  });
  export type ComplaintOut = z.infer<typeof ComplaintOut>;
  
  // =========================
  // Creation DTO (API request body)
  // =========================
  export const ComplaintCreateIn = z.object({
    id: z.string(),

    customerName: z.string(),
    customerPhone: z.string().nullable(),
    customerEmail: z.string().nullable(),
    customerAddress: z.string().nullable(),
    customerCity: z.string().nullable(),
    customerState: z.string().nullable(),
    customerZip: z.string().nullable(),

    respondentName: z.string().nullable(),
    respondentPhone: z.string().nullable(),
    respondentAddress: z.string().nullable(),
    respondentCity: z.string().nullable(),
    respondentState: z.string().nullable(),
    respondentZip: z.string().nullable(),

    dealershipRep: z.string().nullable(),
    complaintType: z.string().nullable(),
    explainComplaint: z.string().nullable(),

    signatureName: z.string().nullable(),
    signatureDate: z.date().nullable(),

    dmvRepresentative: z.string().nullable(),
    dmvRepresentativeDate: z.date().nullable(),
    dmvSupervisor: z.string().nullable(),
    dmvSupervisorDate: z.date().nullable(),

    caseNumber: z.string().nullable(),
    dateReceived: z.date().nullable(),
    investigator: z.string().nullable(),
    status: z.string(),

    createdAt: z.date(),
    updatedAt: z.date(),
    
  });
  export type ComplaintCreateIn = z.infer<typeof ComplaintCreateIn>;
  
  // =========================
  // Update DTO (API request body)
  // =========================
  export const ComplaintUpdateIn = z.object({
    id: z.string(),

    customerName: z.string(),
    customerPhone: z.string().nullable(),
    customerEmail: z.string().nullable(),
    customerAddress: z.string().nullable(),
    customerCity: z.string().nullable(),
    customerState: z.string().nullable(),
    customerZip: z.string().nullable(),

    respondentName: z.string().nullable(),
    respondentPhone: z.string().nullable(),
    respondentAddress: z.string().nullable(),
    respondentCity: z.string().nullable(),
    respondentState: z.string().nullable(),
    respondentZip: z.string().nullable(),

    dealershipRep: z.string().nullable(),
    complaintType: z.string().nullable(),
    explainComplaint: z.string().nullable(),

    signatureName: z.string().nullable(),
    signatureDate: z.date().nullable(),

    dmvRepresentative: z.string().nullable(),
    dmvRepresentativeDate: z.date().nullable(),
    dmvSupervisor: z.string().nullable(),
    dmvSupervisorDate: z.date().nullable(),

    caseNumber: z.string().nullable(),
    dateReceived: z.date().nullable(),
    investigator: z.string().nullable(),
    status: z.string(),

    createdAt: z.date(),
    updatedAt: z.date(),
    
  });
  export type ComplaintUpdateIn = z.infer<typeof ComplaintUpdateIn>;
  
  // =========================
  // Query DTO (API query parameters)
  // =========================
  export const ComplaintsListFilter = Pagination.extend({
    id: z.string(),

    customerName: z.string(),
    customerPhone: z.string().nullable(),
    customerEmail: z.string().nullable(),
    customerAddress: z.string().nullable(),
    customerCity: z.string().nullable(),
    customerState: z.string().nullable(),
    customerZip: z.string().nullable(),

    respondentName: z.string().nullable(),
    respondentPhone: z.string().nullable(),
    respondentAddress: z.string().nullable(),
    respondentCity: z.string().nullable(),
    respondentState: z.string().nullable(),
    respondentZip: z.string().nullable(),

    dealershipRep: z.string().nullable(),
    complaintType: z.string().nullable(),
    explainComplaint: z.string().nullable(),

    signatureName: z.string().nullable(),
    signatureDate: z.date().nullable(),

    dmvRepresentative: z.string().nullable(),
    dmvRepresentativeDate: z.date().nullable(),
    dmvSupervisor: z.string().nullable(),
    dmvSupervisorDate: z.date().nullable(),

    caseNumber: z.string().nullable(),
    dateReceived: z.date().nullable(),
    investigator: z.string().nullable(),
    status: z.string(),

    createdAt: z.date(),
    updatedAt: z.date(),
  });
  export type ComplaintsListFilter = z.infer<typeof ComplaintsListFilter>;