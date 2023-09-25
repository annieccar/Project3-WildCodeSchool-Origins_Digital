const multer = require("multer");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");

const MIME_TYPE = {
  "video/mp4": "mp4",
  "video/MOV": "MOV",
  "video/AVI": "AVI",
  "video/WMF": "WMF",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file.fieldname === "videofile") {
      callback(null, path.join(__dirname, "../../public/videos"));
    }
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_").split(".")[0];
    const ext = MIME_TYPE[file.mimetype];
    callback(null, `${name}-${uuidv4()}.${ext}`);
  },
});

module.exports = multer({ storage }).single("videofile");
