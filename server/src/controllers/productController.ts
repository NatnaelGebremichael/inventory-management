import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (
    req: Request, 
    res: Response
): Promise<void> => {
    try {
        const organizationId = req.query.organizationId?.toString();
        const search = req.query.search?.toString();

        if (!organizationId) {
            res.status(400).json({ message: "Organization ID is required" });
            return;
        }

        const products = await prisma.product.findMany({
            where: {
                organizationId: organizationId,
                name: {
                    contains: search
                }
            }
        })   
        res.json(products);

    } catch (error) {
        res.status(500).json({ message: "Error retriving products"})
    }
}

export const createProduct = async (
    req: Request, 
    res: Response
): Promise<void> => {
    console.log("Received create product request:", req.body);

    try {
         const { name, organizationId, price, rating, stockQuantity, createdAt } = req.body;
         
         // Input validation
         if (!name || !organizationId || price === undefined || stockQuantity === undefined) {
             res.status(400).json({ message: "Missing required fields" });
             return;
         }

         // Check if organization exists
        const organization = await prisma.organization.findUnique({
            where: { id: organizationId }
        });

        if (typeof price !== 'number' || typeof stockQuantity !== 'number') {
            res.status(400).json({ message: "Invalid data types for price or stockQuantity" });
            return;
        }
        
         if (!organization) {
            res.status(400).json({ message: "Invalid organization ID" });
            return;
        }

         const id: string = uuidv4();

         const product = await prisma.$transaction(async (prisma) => {
             return await prisma.product.create({
                data: {
                    id,
                    organizationId,
                    name,
                    price,
                    rating,
                    stockQuantity,
                    createdAt: createdAt || new Date() // Use current date if not provided
                }
             });
         });

         console.log("Product created successfully:", product);
         res.status(201).json(product);
         
    } catch (error: unknown) {
        console.error("Error creating product:", error);
        
        if (error instanceof Error) {
            res.status(500).json({ message: "Error creating product", error: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}