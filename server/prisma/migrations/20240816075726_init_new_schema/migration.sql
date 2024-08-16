/*
  Warnings:

  - You are about to drop the `ExpenseCategoryBreakdown` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExpenseCategoryBreakdown" DROP CONSTRAINT "ExpenseCategoryBreakdown_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ExpenseCategoryBreakdown" DROP CONSTRAINT "ExpenseCategoryBreakdown_expenseSummaryId_fkey";

-- DropTable
DROP TABLE "ExpenseCategoryBreakdown";

-- CreateTable
CREATE TABLE "expenseByCategory" (
    "id" TEXT NOT NULL,
    "expenseSummaryId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "expenseByCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "expenseByCategory" ADD CONSTRAINT "expenseByCategory_expenseSummaryId_fkey" FOREIGN KEY ("expenseSummaryId") REFERENCES "ExpenseSummary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenseByCategory" ADD CONSTRAINT "expenseByCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
