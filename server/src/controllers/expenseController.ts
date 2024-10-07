import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getExpensesByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  // try {
  //   const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
  //     include: {
  //       category: true,
  //       expenseSummary: true,
  //     },
  //     orderBy: {
  //       expenseSummary: {
  //         period: "desc",
  //       },
  //     },
  //   });

  //   const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => ({
  //     id: item.id,
  //     categoryName: item.category.name,
  //     amount: item.amount.toString(),
  //     period: item.expenseSummary.period,
  //   }));

  //   res.json(expenseByCategorySummary);
  // } catch (error) {
  //   console.error("Error retrieving expenses by category:", error);
  //   res.status(500).json({ message: "Error retrieving expenses by category" });
  // }
};