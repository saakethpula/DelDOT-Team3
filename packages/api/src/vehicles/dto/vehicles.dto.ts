import {z} from 'zod';
import { Pagination } from '../../queries';
/*model Vehicle {
    id           String   @id @default(cuid())
    vin          String?  @db.VarChar(17)
    year         Int?
    make         String?
    model        String?
    color        String?
    plateNumber  String?
    // If title/un-title field needed
    plateOrUtitle String?
  
    complaint    Complaint @relation(fields: [complaintId], references: [id])
    complaintId  String   @unique
  }*/



// =========================
// Reference DTO (lightweight relation embed)
// =========================
export const VehicleRef = z.object({
    id: z.number(),
    vin: z.string(),
  });
  export type VehicleRef = z.infer<typeof VehicleRef>;
  
  // =========================
  // Output DTO (API responses)
  // =========================
  export const VehicleOut = z.object({
    id: z.string(),
    vin: z.string().nullable(),
    year: z.number().int().nullable(),
    make: z.string().nullable(),
    model: z.string().nullable(),
    color: z.string().nullable(),
    plateNumber: z.string().nullable(),
    complaintId: z.string(),

  });
  export type VehicleOut = z.infer<typeof VehicleOut>;
  
  // =========================
  // Creation DTO (API request body)
  // =========================
  export const VehicleCreateIn = z.object({
    id: z.string(),
    vin: z.string().nullable(),
    year: z.number().int().nullable(),
    make: z.string().nullable(),
    model: z.string().nullable(),
    color: z.string().nullable(),
    plateNumber: z.string().nullable(),
    complaintId: z.string(),
  });
  export type VehicleCreateIn = z.infer<typeof VehicleCreateIn>;
  
  // =========================
  // Update DTO (API request body)
  // =========================
  export const VehicleUpdateIn = z.object({
    id: z.string(),
    vin: z.string().nullable(),
    year: z.number().int().nullable(),
    make: z.string().nullable(),
    model: z.string().nullable(),
    color: z.string().nullable(),
    plateNumber: z.string().nullable(),
    complaintId: z.string(),
  });
  export type VehicleUpdateIn = z.infer<typeof VehicleUpdateIn>;
  
  // =========================
  // Query DTO (API query parameters)
  // =========================
  export const VehiclesListFilter = Pagination.extend({
    id: z.string(),
    vin: z.string().nullable(),
    year: z.number().int().nullable(),
    make: z.string().nullable(),
    model: z.string().nullable(),
    color: z.string().nullable(),
    plateNumber: z.string().nullable(),
    complaintId: z.string(),
  });
  export type VehiclesListFilter = z.infer<typeof VehiclesListFilter>;