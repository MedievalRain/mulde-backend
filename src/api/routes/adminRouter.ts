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
adminRouter.delete("/user", async (req: AuthRequest, res, next) => {
  try {
    await adminService.deleteUser(req.query, req.credentials);
    res.status(200).json({
      message: "User deleted",
    });
  } catch (error) {
    next(error);
  }
});
adminRouter.delete("/invite", async (req: AuthRequest, res, next) => {
  try {
    await adminService.deleteInvite(req.query, req.credentials);
    res.status(200).json({
      message: "Invite deleted",
    });
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/invite", async (req: AuthRequest, res, next) => {
  try {
    const invites = await adminService.getInvites(req.credentials);
    res.status(200).json(invites);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/invite/rename", async (req: AuthRequest, res, next) => {
  try {
    await adminService.renameInvite(req.body, req.credentials);
    res.status(200).json({
      message: "Invite renamed",
    });
  } catch (error) {
    next(error);
  }
});

export { adminRouter };
