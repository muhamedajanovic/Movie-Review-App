const multer = require("multer");
const storage = multer.diskStorage({});

const fileFilter = (req, res, cb) => {
  console.log(file);
  cb(null, true);
};
