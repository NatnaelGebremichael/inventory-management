import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function deleteAllData() {
  const deleteOrder = [
    "Leave",
    "Employment",
    "Waste",
    "ExpenseByCategory",
    "ExpenseSummary",
    "PurchaseSummary",
    "SalesSummary",
    "Expense",
    "Sale",
    "Purchase",
    "Product",
    "Category",
    "User",
    "Organization"
  ];

  for (const modelName of deleteOrder) {
    const model: any = prisma[modelName.toLowerCase() as keyof typeof prisma];
    if (model) {
      try {
        await model.deleteMany({});
        console.log(`Cleared data from ${modelName}`);
      } catch (error) {
        console.error(`Error clearing data from ${modelName}:`, error);
      }
    } else {
      console.error(
        `Model ${modelName} not found. Please ensure the model name is correctly specified.`
      );
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  const seedFiles = [
    { file: "organizations.json", model: "organization" },
    { file: "users.json", model: "user" },
    { file: "categories.json", model: "category" },
    { file: "products.json", model: "product" },
    { file: "purchases.json", model: "purchase" },
    { file: "sales.json", model: "sale" },
    { file: "expenses.json", model: "expense" },
    { file: "employments.json", model: "employment" },
    { file: "leaves.json", model: "leave" },
    { file: "salesSummary.json", model: "salesSummary" },
    { file: "purchaseSummary.json", model: "purchaseSummary" },
    { file: "expenseSummary.json", model: "expenseSummary" },
    { file: "expenseByCategory.json", model: "expenseByCategory" }
  ];

  await deleteAllData();

  for (const { file, model } of seedFiles) {
    const filePath = path.join(dataDirectory, file);
    if (!fs.existsSync(filePath)) {
      console.log(`File ${file} not found, skipping...`);
      continue;
    }
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const prismaModel: any = prisma[model as keyof typeof prisma];

    if (!prismaModel) {
      console.error(`No Prisma model matches the model name: ${model}`);
      continue;
    }

    for (const data of jsonData) {
      // Convert date strings to Date objects
      for (const key in data) {
        if (typeof data[key] === 'string' && data[key].match(/^\d{4}-\d{2}-\d{2}T/)) {
          data[key] = new Date(data[key]);
        }
      }

      try {
        await prismaModel.create({
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
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });