import { Router } from "express";
import { InstagramController } from "./instagram.controller.js";
import { instagramExchangeDto } from "./instagram.dto.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";

export const InstagramRouter = Router();

InstagramRouter.post(
  "/exchange",
  validate(instagramExchangeDto),
  InstagramController.exchange,
);
InstagramRouter.use(authenticate);

InstagramRouter.get(

  "/media",

  InstagramController.getMedia,

);