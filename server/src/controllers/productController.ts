import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (
    req: Request, 
    res: Response
): Promise<void> => {
    try {
         const search = req.query.search?.toString();
         const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: search,
                    mode: 'insensitive', // This makes the search case-insensitive
                }
            }
         });   
         res.json(products);
    } catch (error) {
        console.error("Error retrieving products:", error);
        res.status(500).json({ message: "Error retrieving products" });
    }
};

export const createProduct = async (
    req: Request, 
    res: Response
): Promise<void> => {
    try {
         const { name, price, rating, stockQuantity } = req.body;
         
         const product = await prisma.product.create({
            data: {
                name,
                price,
                rating,
                stockQuantity
            }
         });
         res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Error creating product" });
    }
};