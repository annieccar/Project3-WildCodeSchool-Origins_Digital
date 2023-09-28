const multer = require("multer");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file.fieldname === "profileimage") {
      callback(null, path.join(__dirname, "../../public/profileimages"));
    }
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_").split(".")[0];
    const ext = MIME_TYPE[file.mimetype];
    callback(null, `${name}-${uuidv4()}.${ext}`);
  },
});

module.exports = multer({ storage }).single("profileimage");
