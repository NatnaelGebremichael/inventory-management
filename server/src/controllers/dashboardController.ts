import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const popularProducts = await prisma.product.findMany({
      take: 15,
      orderBy: {
        stockQuantity: "desc",
      },
    });

    const salesSummary = await prisma.salesSummary.findMany({
      take: 5,
      orderBy: {
        period: "desc",
      },
    });

    const purchaseSummary = await prisma.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        period: "desc",
      },
    });

    const expenseSummary = await prisma.expenseSummary.findMany({
      take: 5,
      orderBy: {
        period: "desc",
      },
    });

    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
      take: 5,
      include: {
        category: true,
        expenseSummary: true,
      },
      orderBy: {
        expenseSummary: {
          period: "desc",
        },
      },
    });

    const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => ({
      id: item.id,
      categoryName: item.category.name,
      amount: item.amount.toString(),
      period: item.expenseSummary.period,
    }));

    res.json({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary,
    });
  } catch (error) {
    console.error("Error retrieving dashboard metrics:", error);
    res.status(500).json({ message: "Error retrieving dashboard metrics" });
  }
};