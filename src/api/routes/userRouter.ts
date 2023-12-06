import express from "express";
import { userService } from "../../domain/user/userService";

const userRouter = express.Router();

userRouter.post("/register", async (req, res, next) => {
  try {
    await userService.register(req.body);
    res.status(200).json({
      message: "User registered",
    });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const { accessToken, refreshToken, sessionExpireDate } =
      await userService.login(req.body);
    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false, // FIXME change in production
        sameSite: "lax",
        expires: new Date(Date.now() + 60 * 60 * 24 * 3 * 1000), // 3 days
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // FIXME change in production
        sameSite: "lax",
        expires: sessionExpireDate,
      })
      .json({
        message: "Successful login",
      });
  } catch (error) {
    next(error);
  }
});

export { userRouter };
