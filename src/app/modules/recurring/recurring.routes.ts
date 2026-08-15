import { Router } from "express";
import { auth } from "../../middleware/auth";
import { RecurringController } from "./recurring.controller";

const router = Router();

router.post("/", auth("user", "admin"), RecurringController.createRecurring);
router.get("/", auth("user", "admin"), RecurringController.getMyRecurring);
router.patch("/:id", auth("user", "admin"), RecurringController.updateRecurring);
router.delete("/:id", auth("user", "admin"), RecurringController.deleteRecurring);

export const recurringRoutes = router;
