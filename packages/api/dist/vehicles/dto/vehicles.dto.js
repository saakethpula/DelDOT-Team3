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

// src/vehicles/dto/vehicles.dto.ts
var vehicles_dto_exports = {};
__export(vehicles_dto_exports, {
  VehicleCreateIn: () => VehicleCreateIn,
  VehicleOut: () => VehicleOut,
  VehicleRef: () => VehicleRef,
  VehicleUpdateIn: () => VehicleUpdateIn,
  VehiclesListFilter: () => VehiclesListFilter
});
module.exports = __toCommonJS(vehicles_dto_exports);
var import_zod2 = require("zod");

// src/queries.ts
var import_zod = require("zod");
var Pagination = import_zod.z.object({
  limit: import_zod.z.number().int().positive().max(100).default(20),
  offset: import_zod.z.number().int().nonnegative().default(0)
});

// src/vehicles/dto/vehicles.dto.ts
var VehicleRef = import_zod2.z.object({
  id: import_zod2.z.number(),
  vin: import_zod2.z.string()
});
var VehicleOut = import_zod2.z.object({
  id: import_zod2.z.string(),
  vin: import_zod2.z.string().nullable(),
  year: import_zod2.z.number().int().nullable(),
  make: import_zod2.z.string().nullable(),
  model: import_zod2.z.string().nullable(),
  color: import_zod2.z.string().nullable(),
  plateNumber: import_zod2.z.string().nullable(),
  complaintId: import_zod2.z.string()
});
var VehicleCreateIn = import_zod2.z.object({
  id: import_zod2.z.string(),
  vin: import_zod2.z.string().nullable(),
  year: import_zod2.z.number().int().nullable(),
  make: import_zod2.z.string().nullable(),
  model: import_zod2.z.string().nullable(),
  color: import_zod2.z.string().nullable(),
  plateNumber: import_zod2.z.string().nullable(),
  complaintId: import_zod2.z.string()
});
var VehicleUpdateIn = import_zod2.z.object({
  id: import_zod2.z.string(),
  vin: import_zod2.z.string().nullable(),
  year: import_zod2.z.number().int().nullable(),
  make: import_zod2.z.string().nullable(),
  model: import_zod2.z.string().nullable(),
  color: import_zod2.z.string().nullable(),
  plateNumber: import_zod2.z.string().nullable(),
  complaintId: import_zod2.z.string()
});
var VehiclesListFilter = Pagination.extend({
  id: import_zod2.z.string(),
  vin: import_zod2.z.string().nullable(),
  year: import_zod2.z.number().int().nullable(),
  make: import_zod2.z.string().nullable(),
  model: import_zod2.z.string().nullable(),
  color: import_zod2.z.string().nullable(),
  plateNumber: import_zod2.z.string().nullable(),
  complaintId: import_zod2.z.string()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VehicleCreateIn,
  VehicleOut,
  VehicleRef,
  VehicleUpdateIn,
  VehiclesListFilter
});
