  import { PrismaClient } from "@prisma/client";
  import fs from "fs";
  import path from "path";
  const prisma = new PrismaClient();

  async function deleteAllData() {
    const deleteOrder = [
      "ExpenseByCategory",
      "ExpenseSummary",
      "PurchaseSummary",
      "SalesSummary",
      "Leave",
      "Employment",
      "Waste",
      "Expense",
      "Sale",
      "Purchase",
      "Product",
      "Category",
      "User"
    ];

    for (const modelName of deleteOrder) {
      const model: any = prisma[modelName as keyof typeof prisma];
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
      { file: "users.json", model: "User" },
      { file: "categories.json", model: "Category" },
      { file: "products.json", model: "Product" },
      { file: "sales.json", model: "Sale" },
      { file: "purchases.json", model: "Purchase" },
      { file: "expenses.json", model: "Expense" },
      { file: "wastes.json", model: "Waste" },
      { file: "employments.json", model: "Employment" },
      { file: "leaves.json", model: "Leave" },
      { file: "salesSummary.json", model: "SalesSummary" },
      { file: "purchaseSummary.json", model: "PurchaseSummary" },
      { file: "expenseSummary.json", model: "ExpenseSummary" },
      { file: "expenseByCategory.json", model: "ExpenseByCategory" }
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
        // Convert string dates to Date objects
        if (data.createdAt) {
          data.createdAt = new Date(data.createdAt);
        }
        if (data.updatedAt) {
          data.updatedAt = new Date(data.updatedAt);
        }
  
        // Add createdAt and updatedAt if they don't exist
        if (!data.createdAt) {
          data.createdAt = new Date();
        }
        if (!data.updatedAt) {
          data.updatedAt = new Date();
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