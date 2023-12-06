import express from "express";
import { inviteService } from "../../domain/invite/inviteService";
import { authMiddleware } from "../../middleware/authMiddleware";
import { AuthRequest } from "../../types";

const inviteRouter = express.Router();
inviteRouter.use(authMiddleware);

inviteRouter.post("/create", async (req: AuthRequest, res, next) => {
  try {
    await inviteService.createInvite(req.body, req.credentials);
    res.status(200).json({
      message: "Invite created",
    });
  } catch (error) {
    next(error);
  }
});

export { inviteRouter };
