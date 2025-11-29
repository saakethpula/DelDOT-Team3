import {
  client_exports,
  prisma
} from "./chunk-LKTASNSP.mjs";

// src/seed.ts
import fs from "fs";
import path from "path";
var DEFAULT_USERS = [
  // Add your own user to pre-populate the database with
  {
    name: "Tim Apple",
    email: "tim@apple.com"
  }
];
var SEED_DIR = path.join(__dirname, "..", "prisma", "seed-data");
function loadJSON(filename) {
  const p = path.join(SEED_DIR, filename);
  if (!fs.existsSync(p)) return null;
  const raw = fs.readFileSync(p, "utf-8");
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
