/*
  Warnings:

  - The primary key for the `ExpenseSummary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `ExpenseSummary` table. All the data in the column will be lost.
  - You are about to drop the column `expenseSummaryId` on the `ExpenseSummary` table. All the data in the column will be lost.
  - The primary key for the `PurchaseSummary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `changePercentage` on the `PurchaseSummary` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `PurchaseSummary` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseSummaryId` on the `PurchaseSummary` table. All the data in the column will be lost.
  - You are about to drop the column `totalPurchased` on the `PurchaseSummary` table. All the data in the column will be lost.
  - The primary key for the `SalesSummary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `changePercentage` on the `SalesSummary` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `SalesSummary` table. All the data in the column will be lost.
  - You are about to drop the column `salesSummaryId` on the `SalesSummary` table. All the data in the column will be lost.
  - You are about to drop the column `totalValue` on the `SalesSummary` table. All the data in the column will be lost.
  - You are about to drop the `ExpenseByCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Expenses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Purchases` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sales` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `ExpenseSummary` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `period` to the `ExpenseSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceDataHash` to the `ExpenseSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ExpenseSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averageOrderValue` to the `PurchaseSummary` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `PurchaseSummary` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `period` to the `PurchaseSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceDataHash` to the `PurchaseSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPurchases` to the `PurchaseSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalQuantity` to the `PurchaseSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PurchaseSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averageOrderSize` to the `SalesSummary` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `SalesSummary` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `period` to the `SalesSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceDataHash` to the `SalesSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalQuantity` to the `SalesSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalSales` to the `SalesSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SalesSummary` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('DEBT', 'PAID');

-- CreateEnum
CREATE TYPE "LeaveType" AS ENUM ('SICK', 'ANNUAL', 'OTHER');

-- CreateEnum
CREATE TYPE "LeaveStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "ExpenseByCategory" DROP CONSTRAINT "ExpenseByCategory_expenseSummaryId_fkey";

-- DropForeignKey
ALTER TABLE "Purchases" DROP CONSTRAINT "Purchases_productId_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_productId_fkey";

-- AlterTable
ALTER TABLE "ExpenseSummary" DROP CONSTRAINT "ExpenseSummary_pkey",
DROP COLUMN "date",
DROP COLUMN "expenseSummaryId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "period" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sourceDataHash" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "ExpenseSummary_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PurchaseSummary" DROP CONSTRAINT "PurchaseSummary_pkey",
DROP COLUMN "changePercentage",
DROP COLUMN "date",
DROP COLUMN "purchaseSummaryId",
DROP COLUMN "totalPurchased",
ADD COLUMN     "averageOrderValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "period" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sourceDataHash" TEXT NOT NULL,
ADD COLUMN     "totalPurchases" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalQuantity" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "PurchaseSummary_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SalesSummary" DROP CONSTRAINT "SalesSummary_pkey",
DROP COLUMN "changePercentage",
DROP COLUMN "date",
DROP COLUMN "salesSummaryId",
DROP COLUMN "totalValue",
ADD COLUMN     "averageOrderSize" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "period" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sourceDataHash" TEXT NOT NULL,
ADD COLUMN     "totalQuantity" INTEGER NOT NULL,
ADD COLUMN     "totalSales" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "SalesSummary_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "ExpenseByCategory";

-- DropTable
DROP TABLE "Expenses";

-- DropTable
DROP TABLE "Products";

-- DropTable
DROP TABLE "Purchases";

-- DropTable
DROP TABLE "Sales";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "rating" DOUBLE PRECISION,
    "stockQuantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitCost" DOUBLE PRECISION NOT NULL,
    "totalCost" DOUBLE PRECISION NOT NULL,
    "paymentType" "PaymentType" NOT NULL,
    "dueDate" TIMESTAMP(3),
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "purchaseSummaryId" TEXT,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "expenseSummaryId" TEXT,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Waste" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Waste_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "contractType" TEXT NOT NULL,
    "documents" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Employment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leave" (
    "id" TEXT NOT NULL,
    "employmentId" TEXT NOT NULL,
    "type" "LeaveType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "LeaveStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Leave_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseCategoryBreakdown" (
    "id" TEXT NOT NULL,
    "expenseSummaryId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ExpenseCategoryBreakdown_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Employment_userId_key" ON "Employment"("userId");

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_purchaseSummaryId_fkey" FOREIGN KEY ("purchaseSummaryId") REFERENCES "PurchaseSummary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_expenseSummaryId_fkey" FOREIGN KEY ("expenseSummaryId") REFERENCES "ExpenseSummary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Waste" ADD CONSTRAINT "Waste_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employment" ADD CONSTRAINT "Employment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leave" ADD CONSTRAINT "Leave_employmentId_fkey" FOREIGN KEY ("employmentId") REFERENCES "Employment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseCategoryBreakdown" ADD CONSTRAINT "ExpenseCategoryBreakdown_expenseSummaryId_fkey" FOREIGN KEY ("expenseSummaryId") REFERENCES "ExpenseSummary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseCategoryBreakdown" ADD CONSTRAINT "ExpenseCategoryBreakdown_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
