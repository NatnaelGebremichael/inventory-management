import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { organizationId } = req.body;

        const users = await prisma.employee.findMany({
            where: { organizationId },
        }
        );
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
        const { id, firstName, lastName, organizationId, position, hireDate, salary } = req.body;
        const user = await prisma.employee.create({
           data: {
               id,
               organizationId,
               firstName,
               lastName,
               position,
               hireDate,
               salary,
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
        const user = await prisma.employee.update({
           where: { id },
           data: { organizationId }
        });
        res.json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user" });
    }
};