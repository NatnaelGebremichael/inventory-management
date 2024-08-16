"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardMetrics = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getDashboardMetrics = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const popularProducts = yield prisma.product.findMany({
        take: 15,
        orderBy: {
          sales: {
            _count: "desc",
          },
        },
        include: {
          _count: {
            select: { sales: true },
          },
          sales: {
            select: {
              quantity: true,
            },
          },
        },
      });
      const popularProductsWithSales = popularProducts.map((product) =>
        Object.assign(Object.assign({}, product), {
          totalSold: product.sales.reduce(
            (sum, sale) => sum + sale.quantity,
            0
          ),
          _count: undefined,
          sales: undefined,
        })
      );
      const salesSummary = yield prisma.salesSummary.findMany({
        take: 5,
        orderBy: {
          period: "desc",
        },
      });
      const purchaseSummary = yield prisma.purchaseSummary.findMany({
        take: 5,
        orderBy: {
          period: "desc",
        },
      });
      const expenseSummary = yield prisma.expenseSummary.findMany({
        take: 5,
        orderBy: {
          period: "desc",
        },
      });
      const expenseByCategorySummaryRaw =
        yield prisma.expenseByCategory.findMany({
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
      const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
        (item) => ({
          id: item.id,
          categoryName: item.category.name,
          amount: item.amount.toString(),
          period: item.expenseSummary.period,
        })
      );
      res.json({
        popularProducts: popularProductsWithSales,
        salesSummary,
        purchaseSummary,
        expenseSummary,
        expenseByCategorySummary,
      });
    } catch (error) {
      console.error("Error retrieving dashboard metrics:", error);
      res.status(500).json({ message: "Error retrieving dashboard metrics" });
    }
  });
exports.getDashboardMetrics = getDashboardMetrics;
