import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getOrganization = async (req: Request, res: Response): Promise<void> => {
    try {
        const organization = await prisma.organization.findMany();
        res.json(organization);
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ message: "Error retrieving Organization" });
    }
};

export const createOrganization = async (
    req: Request, 
    res: Response
): Promise<void> => {
    try {
        const { id, name, createdAt, userId } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const org = await prisma.organization.create({
            data: {
                id,
                name,
                createdAt,
                users: {
                    connect: { id: userId } // Connect the existing user by ID
                }
            }
        });
        
        res.json(org);
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ message: "Error retrieving org" });
    }
};