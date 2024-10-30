import dotenv from "dotenv";
dotenv.config();
var express = require('express');
var router = express.Router();


const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "upload");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname + '-' + uniqueSuffix)
    },
  });
const upload = multer({ storage: storage });

router.post("/upload/:user_id", upload.single("uploaded_file"), (req, res, next) => {
    const file = req.file;
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    
    res.status(200).send(file);
    res.render('index', { title: 'Express' });
  });


module.exports = router;
