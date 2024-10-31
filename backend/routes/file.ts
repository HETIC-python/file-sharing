import dotenv from "dotenv";
import express from "express";
import { checkSchema } from "express-validator";
import multer from "multer";
import { addFile, download } from "../controller/file_controller";
import { user_schema } from "../schema/user_schema";
import { App } from "../type/app";
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
  
  router.post("/upload/:user_id", checkSchema(user_schema), upload.single("file"), addFile(app));
  router.get("/download/:hash", checkSchema(user_schema), download(app));

  return router;
};