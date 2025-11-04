import { prisma } from "./client";
import fs from "fs";
import path from "path";

import type { User } from "../generated/client";

const DEFAULT_USERS = [
  // Add your own user to pre-populate the database with
  {
    name: "Tim Apple",
    email: "tim@apple.com",
  },
] as Array<Partial<User>>;

const SEED_DIR = path.join(__dirname, "..", "prisma", "seed-data");

function loadJSON(filename: string) {
  const p = path.join(SEED_DIR, filename);
  if (!fs.existsSync(p)) return null;
  const raw = fs.readFileSync(p, "utf-8");
  return JSON.parse(raw);
}

async function seedUsers() {
  const users = loadJSON("users.json") || DEFAULT_USERS;
  await Promise.all(
    users.map((user: any) =>
      prisma.user.upsert({
        where: {
          email: user.email!,
        },
        update: {
          ...user,
        },
        create: {
          ...user,
        },
      })
    )
  );
}

async function seedComplaints() {
  const complaints = loadJSON("complaints.json");
  if (!complaints || !Array.isArray(complaints)) return;

  for (const c of complaints) {
    try {
        // Create/upsert complaints with only scalar fields. Relations (vehicle/documents)
        // will be created separately so we can reference complaints by caseNumber.
        const complaintFields = { ...c } as any;
        delete complaintFields.vehicle;
        delete complaintFields.documents;

        if (c.caseNumber) {
          await prisma.complaint.upsert({
            where: { caseNumber: c.caseNumber },
            update: {
              ...complaintFields,
            } as any,
            create: {
              ...complaintFields,
            } as any,
          });
        } else {
          await prisma.complaint.create({
            data: {
              ...complaintFields,
            } as any,
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
        const complaint = await prisma.complaint.findUnique({ where: { caseNumber: v.complaintCaseNumber } as any });
        if (!complaint) {
          console.warn("No complaint found for vehicle, skipping", v.complaintCaseNumber);
          continue;
        }

        // Upsert vehicle by complaintId (unique) so we don't create duplicates
        const vehicleData = { ...v } as any;
        delete vehicleData.complaintCaseNumber;

        await prisma.vehicle.upsert({
          where: { complaintId: complaint.id },
          update: {
            ...vehicleData,
          } as any,
          create: {
            ...vehicleData,
            complaint: { connect: { id: complaint.id } },
          } as any,
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
        const complaint = await prisma.complaint.findUnique({ where: { caseNumber: d.complaintCaseNumber } as any });
        if (!complaint) {
          console.warn("No complaint found for document, skipping", d.complaintCaseNumber);
          continue;
        }

        const docData = { ...d } as any;
        delete docData.complaintCaseNumber;

        await prisma.document.create({
          data: {
            ...docData,
            complaint: { connect: { id: complaint.id } },
          } as any,
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
