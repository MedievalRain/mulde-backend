import express from "express";
import { adminService } from "../../domain/admin/adminService";
import { authMiddleware } from "../../middleware/authMiddleware";
import { AuthRequest } from "../../types";

const adminRouter = express.Router();
adminRouter.use(authMiddleware);

adminRouter.post("/invite/create", async (req: AuthRequest, res, next) => {
  try {
    await adminService.createInvite(req.body, req.credentials);
    res.status(200).json({
      message: "invite created",
    });
  } catch (error) {
    next(error);
  }
});

export { adminRouter };