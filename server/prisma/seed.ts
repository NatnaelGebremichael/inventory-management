import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set in the environment variables.");
  process.exit(1);
}

const prisma = new PrismaClient();

type ModelName = "organization" | "employee" | "category" | "product" | "supplier" | "customer";

async function deleteAllData() {
  const deleteOrder: ModelName[] = [
    "customer",
    "product",
    "category",
    "supplier",
    "employee",
    "organization"
  ];

  for (const modelName of deleteOrder) {
    try {
      await (prisma[modelName] as any).deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } catch (error) {
      console.error(`Error clearing data from ${modelName}:`, error);
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  const seedFiles = [
    { file: "Organization.json", model: "organization" as ModelName },
    { file: "Employee.json", model: "employee" as ModelName },
    { file: "Category.json", model: "category" as ModelName },
    { file: "Product.json", model: "product" as ModelName },
    { file: "Supplier.json", model: "supplier" as ModelName },
    { file: "Customer.json", model: "customer" as ModelName }
  ];

  await deleteAllData();

  for (const { file, model } of seedFiles) {
    const filePath = path.join(dataDirectory, file);
    if (!fs.existsSync(filePath)) {
      console.log(`File ${file} not found, skipping...`);
      continue;
    }
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const prismaModel = prisma[model];

    for (const data of jsonData) {
      for (const key in data) {
        if (typeof data[key] === 'string' && data[key].match(/^\d{4}-\d{2}-\d{2}T/)) {
          data[key] = new Date(data[key]);
        }
      }

      try {
        await (prismaModel as any).create({
          data,
        });
      } catch (error) {
        console.error(`Error creating ${model}:`, error);
      }
    }

    console.log(`Seeded ${model} with data from ${file}`);
  }
}

main()
  .catch((e) => {
    console.error("Error in seed script:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });