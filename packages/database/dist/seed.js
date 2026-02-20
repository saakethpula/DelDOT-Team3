"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/client.ts
var client_exports = {};
__export(client_exports, {
  prisma: () => prisma
});
var import_client = require("@prisma/client");
__reExport(client_exports, require("@prisma/client"));
var globalForPrisma = global;
var prisma = globalForPrisma.prisma || new import_client.PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// src/seed.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var DEFAULT_USERS = [
  // Add your own user to pre-populate the database with
  {
    name: "Tim Apple",
    email: "tim@apple.com"
  }
];
var SEED_DIR = import_path.default.join(__dirname, "..", "prisma", "seed-data");
function loadJSON(filename) {
  const p = import_path.default.join(SEED_DIR, filename);
  if (!import_fs.default.existsSync(p)) return null;
  const raw = import_fs.default.readFileSync(p, "utf-8");
  return JSON.parse(raw);
}
async function seedUsers() {
  const users = loadJSON("users.json") || DEFAULT_USERS;
  await Promise.all(
    users.map(
      (user) => prisma.user.upsert({
        where: {
          email: user.email
        },
        update: {
          ...user
        },
        create: {
          ...user
        }
      })
    )
  );
}
async function seedComplaints() {
  const complaints = loadJSON("complaints.json");
  if (!complaints || !Array.isArray(complaints)) return;
  for (const c of complaints) {
    try {
      const complaintFields = { ...c };
      delete complaintFields.vehicle;
      delete complaintFields.documents;
      if (c.caseNumber) {
        await prisma.complaint.upsert({
          where: { caseNumber: c.caseNumber },
          update: {
            ...complaintFields
          },
          create: {
            ...complaintFields
          }
        });
      } else {
        await prisma.complaint.create({
          data: {
            ...complaintFields
          }
        });
      }
    } catch (err) {
      console.error("Failed to seed complaint", c.caseNumber ?? JSON.stringify(c).slice(0, 80), err);
    }
  }
}
async function seedVehicles() {
  const vehicles = loadJSON("vehicles.json");
  if (!vehicles || !Array.isArray(vehicles)) return;
  for (const v of vehicles) {
    try {
      if (!v.complaintCaseNumber) {
        console.warn("Vehicle missing complaintCaseNumber, skipping", v);
        continue;
      }
      const complaint = await prisma.complaint.findUnique({ where: { caseNumber: v.complaintCaseNumber } });
      if (!complaint) {
        console.warn("No complaint found for vehicle, skipping", v.complaintCaseNumber);
        continue;
      }
      const vehicleData = { ...v };
      delete vehicleData.complaintCaseNumber;
      await prisma.vehicle.upsert({
        where: { complaintId: complaint.id },
        update: {
          ...vehicleData
        },
        create: {
          ...vehicleData,
          complaint: { connect: { id: complaint.id } }
        }
      });
    } catch (err) {
      console.error("Failed to seed vehicle", v, err);
    }
  }
}
async function seedDocuments() {
  const documents = loadJSON("documents.json");
  if (!documents || !Array.isArray(documents)) return;
  for (const d of documents) {
    try {
      if (!d.complaintCaseNumber) {
        console.warn("Document missing complaintCaseNumber, skipping", d);
        continue;
      }
      const complaint = await prisma.complaint.findUnique({ where: { caseNumber: d.complaintCaseNumber } });
      if (!complaint) {
        console.warn("No complaint found for document, skipping", d.complaintCaseNumber);
        continue;
      }
      const docData = { ...d };
      delete docData.complaintCaseNumber;
      await prisma.document.create({
        data: {
          ...docData,
          complaint: { connect: { id: complaint.id } }
        }
      });
    } catch (err) {
      console.error("Failed to seed document", d, err);
    }
  }
}
(async () => {
  try {
    await seedUsers();
    await seedComplaints();
    await seedVehicles();
    await seedDocuments();
    console.log("Seeding complete.");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
