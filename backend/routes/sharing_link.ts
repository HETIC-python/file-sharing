import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import {checkSchema} from "express-validator";
import {sharing_link_schema} from "../schema/sharing_link_schema";
import {generate} from "../controller/sharing_link_controller";
import {App} from "../type/app";
import exp from "constants";
dotenv.config();


export function getFileRoutes(app: App) {
  const router = express.Router();
  
  router.get("/sharing_link/:user_id/:file_id", checkSchema(sharing_link_schema), generate(app));
  return router;
};