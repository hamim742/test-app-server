import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { RecurringService } from "./recurring.service";

const createRecurring = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const result = await RecurringService.createRecurring(userId, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Recurring transaction schedule created successfully",
    data: result,
  });
});

const getMyRecurring = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const result = await RecurringService.getMyRecurring(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Recurring transaction schedules retrieved successfully",
    data: result,
  });
});

const updateRecurring = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;
  const result = await RecurringService.updateRecurring(id, userId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Recurring transaction schedule updated successfully",
    data: result,
  });
});

const deleteRecurring = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;
  const result = await RecurringService.deleteRecurring(id, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Recurring transaction schedule deleted successfully",
    data: result,
  });
});

export const RecurringController = {
  createRecurring,
  getMyRecurring,
  updateRecurring,
  deleteRecurring,
};
