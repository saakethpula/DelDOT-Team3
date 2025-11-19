import {
  Pagination
} from "../../chunk-GZ4POAPY.mjs";

// src/vehicles/dto/vehicles.dto.ts
import { z } from "zod";
var VehicleRef = z.object({
  id: z.number(),
  vin: z.string()
});
var VehicleOut = z.object({
  id: z.string(),
  vin: z.string().nullable(),
  year: z.number().int().nullable(),
  make: z.string().nullable(),
  model: z.string().nullable(),
  color: z.string().nullable(),
  plateNumber: z.string().nullable(),
  complaintId: z.string()
});
var VehicleCreateIn = z.object({
  id: z.string(),
  vin: z.string().nullable(),
  year: z.number().int().nullable(),
  make: z.string().nullable(),
  model: z.string().nullable(),
  color: z.string().nullable(),
  plateNumber: z.string().nullable(),
  complaintId: z.string()
});
var VehicleUpdateIn = z.object({
  id: z.string(),
  vin: z.string().nullable(),
  year: z.number().int().nullable(),
  make: z.string().nullable(),
  model: z.string().nullable(),
  color: z.string().nullable(),
  plateNumber: z.string().nullable(),
  complaintId: z.string()
});
var VehiclesListFilter = Pagination.extend({
  id: z.string(),
  vin: z.string().nullable(),
  year: z.number().int().nullable(),
  make: z.string().nullable(),
  model: z.string().nullable(),
  color: z.string().nullable(),
  plateNumber: z.string().nullable(),
  complaintId: z.string()
});
export {
  VehicleCreateIn,
  VehicleOut,
  VehicleRef,
  VehicleUpdateIn,
  VehiclesListFilter
};
