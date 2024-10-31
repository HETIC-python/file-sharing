import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import {checkSchema} from "express-validator";
import {user_schema} from "../schema/user_schema";
import {addFile,download, getFilesFromUser} from "../controller/file_controller";
import {App} from "../type/app";
import exp from "constants";
import { file_schema } from "../schema/file_schema";
import { sharing_link_schema } from "../schema/sharing_link_schema";
dotenv.config();


export function getFileRoutes(app: App) {
  const router = express.Router();
    
  const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "upload");
      },
      filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, uniqueSuffix + '-' + file.originalname)
      },
    });
  const upload = multer({ storage: storage });
  
  router.post("/upload/:user_id", checkSchema(file_schema), upload.single("file"), async (req, res, next) => {
    try {
      await addFile(app)(req, res, next);
    } catch (err) {
      next(err);
    }
  });
  router.get("/public_link/download/:hash", async (req, res, next) => {
    try {
      await download(app)(req, res, next);
    } catch (err) {
      next(err);
    }});

  router.get('/files/:user_id', getFilesFromUser(app));

  return router;
};