const multer = require("multer");
const path = require("node:path");

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file.fieldname === "thumbnailfile") {
      callback(null, path.join(__dirname, "../../public/thumbnails"));
    }
  },
  filename: (req, file, callback) => {
    const fileName = req.query.file_name.split(".")[0];
    const ext = MIME_TYPE[file.mimetype];
    callback(null, `${fileName}.${ext}`);
  },
});

module.exports = multer({ storage }).single("thumbnailfile");
