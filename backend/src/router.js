const express = require("express");

const router = express.Router();

const usersRoutes = require("./routes/users.routes");
const videosRoutes = require("./routes/videos.routes");
const playlistsRoutes = require("./routes/playlists.routes");
const categoriesRoutes = require("./routes/categories.routes");
const carouselsRoutes = require("./routes/carousels.routes");
const authRoutes = require("./routes/auth.routes");
const { verifyJWT } = require("./helpers/jwtHelper");
const checkRoles = require("./middlewares/checkRoles");

// project routes
router.use("/users", verifyJWT, usersRoutes);
router.use("/videos", videosRoutes);
router.use("/playlists", verifyJWT, checkRoles(2, 3), playlistsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/carousels", carouselsRoutes);
router.use("/auth", authRoutes);

module.exports = router;
