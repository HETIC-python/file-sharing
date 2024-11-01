import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import {checkSchema} from "express-validator";
import {sharing_link_schema} from "../schema/sharing_link_schema";
import {generate} from "../controller/sharing_link_controller";
import {App} from "../type/app";
import exp from "constants";
import { getAllFromUser } from "../controller/sharing_link_controller";
dotenv.config();


export function getLinkRoutes(app: App) {
  const router = express.Router();
  
  router.get("/sharing_link/:user_id/:file_id", checkSchema(sharing_link_schema), async (req, res, next) => {
    try {
      const result = await generate(app)(req, res, next);
      if (result) {
        res.send(result);
      }
    } catch (error) {
      next(error);
    }
  });

  router.get("/sharing_links/:user_id", getAllFromUser(app));

  return router;
};