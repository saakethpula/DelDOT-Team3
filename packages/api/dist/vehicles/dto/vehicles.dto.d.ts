import { z } from 'zod';
export declare const VehicleRef: z.ZodObject<{
    id: z.ZodNumber;
    vin: z.ZodString;
}, z.core.$strip>;
export type VehicleRef = z.infer<typeof VehicleRef>;
export declare const VehicleOut: z.ZodObject<{
    id: z.ZodString;
    vin: z.ZodNullable<z.ZodString>;
    year: z.ZodNullable<z.ZodNumber>;
    make: z.ZodNullable<z.ZodString>;
    model: z.ZodNullable<z.ZodString>;
    color: z.ZodNullable<z.ZodString>;
    plateNumber: z.ZodNullable<z.ZodString>;
    complaintId: z.ZodString;
}, z.core.$strip>;
export type VehicleOut = z.infer<typeof VehicleOut>;
export declare const VehicleCreateIn: z.ZodObject<{
    id: z.ZodString;
    vin: z.ZodNullable<z.ZodString>;
    year: z.ZodNullable<z.ZodNumber>;
    make: z.ZodNullable<z.ZodString>;
    model: z.ZodNullable<z.ZodString>;
    color: z.ZodNullable<z.ZodString>;
    plateNumber: z.ZodNullable<z.ZodString>;
    complaintId: z.ZodString;
}, z.core.$strip>;
export type VehicleCreateIn = z.infer<typeof VehicleCreateIn>;
export declare const VehicleUpdateIn: z.ZodObject<{
    id: z.ZodString;
    vin: z.ZodNullable<z.ZodString>;
    year: z.ZodNullable<z.ZodNumber>;
    make: z.ZodNullable<z.ZodString>;
    model: z.ZodNullable<z.ZodString>;
    color: z.ZodNullable<z.ZodString>;
    plateNumber: z.ZodNullable<z.ZodString>;
    complaintId: z.ZodString;
}, z.core.$strip>;
export type VehicleUpdateIn = z.infer<typeof VehicleUpdateIn>;
export declare const VehiclesListFilter: z.ZodObject<{
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
    id: z.ZodString;
    vin: z.ZodNullable<z.ZodString>;
    year: z.ZodNullable<z.ZodNumber>;
    make: z.ZodNullable<z.ZodString>;
    model: z.ZodNullable<z.ZodString>;
    color: z.ZodNullable<z.ZodString>;
    plateNumber: z.ZodNullable<z.ZodString>;
    complaintId: z.ZodString;
}, z.core.$strip>;
export type VehiclesListFilter = z.infer<typeof VehiclesListFilter>;
//# sourceMappingURL=vehicles.dto.d.ts.map