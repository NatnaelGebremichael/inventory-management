"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
function deleteAllData() {
    return __awaiter(this, void 0, void 0, function* () {
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
            const model = prisma[modelName];
            if (model) {
                try {
                    yield model.deleteMany({});
                    console.log(`Cleared data from ${modelName}`);
                }
                catch (error) {
                    console.error(`Error clearing data from ${modelName}:`, error);
                }
            }
            else {
                console.error(`Model ${modelName} not found. Please ensure the model name is correctly specified.`);
            }
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const dataDirectory = path_1.default.join(__dirname, "seedData");
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
        yield deleteAllData();
        for (const { file, model } of seedFiles) {
            const filePath = path_1.default.join(dataDirectory, file);
            if (!fs_1.default.existsSync(filePath)) {
                console.log(`File ${file} not found, skipping...`);
                continue;
            }
            const jsonData = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
            const prismaModel = prisma[model];
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
                    yield prismaModel.create({
                        data,
                    });
                }
                catch (error) {
                    console.error(`Error creating ${model}:`, error);
                }
            }
            console.log(`Seeded ${model} with data from ${file}`);
        }
    });
}
main()
    .catch((e) => {
    console.error(e);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
