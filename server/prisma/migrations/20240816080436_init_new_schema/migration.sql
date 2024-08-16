/*
  Warnings:

  - You are about to drop the `expenseByCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "expenseByCategory" DROP CONSTRAINT "expenseByCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "expenseByCategory" DROP CONSTRAINT "expenseByCategory_expenseSummaryId_fkey";

-- DropTable
DROP TABLE "expenseByCategory";

-- CreateTable
CREATE TABLE "ExpenseByCategory" (
    "id" TEXT NOT NULL,
    "expenseSummaryId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseByCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExpenseByCategory" ADD CONSTRAINT "ExpenseByCategory_expenseSummaryId_fkey" FOREIGN KEY ("expenseSummaryId") REFERENCES "ExpenseSummary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseByCategory" ADD CONSTRAINT "ExpenseByCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
