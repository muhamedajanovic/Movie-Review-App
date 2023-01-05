const multer = require("multer");
const storage = multer.diskStorage({});

const imageFileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    cb("Supported images only!", false);
  }
  cb(null, true);
};
const videoFileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("video")) {
    cb("Supported videos only!", false);
  }
  cb(null, true);
};
exports.uploadImage = multer({ storage, imageFileFilter });
exports.uploadVideo = multer({ storage, videoFileFilter });
