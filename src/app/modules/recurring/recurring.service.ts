import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";
import { ICreateRecurringTransaction, IUpdateRecurringTransaction } from "./recurring.interface";

const createRecurring = async (userId: string, payload: ICreateRecurringTransaction) => {
  const result = await prisma.recurringTransaction.create({
    data: {
      ...payload,
      userId,
    },
  });
  return result;
};

const getMyRecurring = async (userId: string) => {
  const result = await prisma.recurringTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return result;
};

const updateRecurring = async (
  id: string,
  userId: string,
  payload: IUpdateRecurringTransaction
) => {
  const item = await prisma.recurringTransaction.findUnique({
    where: { id },
  });

  if (!item) {
    throw new AppError("Recurring transaction schedule not found", 404);
  }

  if (item.userId !== userId) {
    throw new AppError("You are not authorized to update this schedule", 403);
  }

  const result = await prisma.recurringTransaction.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteRecurring = async (id: string, userId: string) => {
  const item = await prisma.recurringTransaction.findUnique({
    where: { id },
  });

  if (!item) {
    throw new AppError("Recurring transaction schedule not found", 404);
  }

  if (item.userId !== userId) {
    throw new AppError("You are not authorized to delete this schedule", 403);
  }

  await prisma.recurringTransaction.delete({
    where: { id },
  });

  return { message: "Recurring schedule deleted successfully" };
};

export const RecurringService = {
  createRecurring,
  getMyRecurring,
  updateRecurring,
  deleteRecurring,
};
