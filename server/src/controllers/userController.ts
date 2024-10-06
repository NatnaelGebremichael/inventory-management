import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ message: "Error retrieving users" });
    }
};

export const createUser = async (
    req: Request, 
    res: Response
): Promise<void> => {
    try {
        const { id, name, email, role } = req.body;
        const user = await prisma.user.create({
           data: {
               id,
               name,
               email,
               role,
               createdAt: new Date().toISOString(), // Set the current time as an ISO string
           }
        });
        res.json(user);
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ message: "Error retrieving users" });
    }
};

export const updateUser = async (
    req: Request, 
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const { organizationId } = req.body;
        const user = await prisma.user.update({
           where: { id },
           data: { organizationId }
        });
        res.json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user" });
    }
};