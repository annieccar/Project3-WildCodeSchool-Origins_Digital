const express = require("express");

const router = express.Router();

const itemsRoutes = require("./routes/items.routes");
const usersRoutes = require("./routes/users.routes");
const videosRoutes = require("./routes/videos.routes");
const playlistsRoutes = require("./routes/playlists.routes");
const categoriesRoutes = require("./routes/categories.routes");
const carouselsRoutes = require("./routes/carousels.routes");
const authRoutes = require("./routes/auth.routes");

// example
router.use("/items", itemsRoutes);
// project routes
router.use("/users", usersRoutes);
router.use("/videos", videosRoutes);
router.use("/playlists", playlistsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/carousels", carouselsRoutes);
router.use("/auth", authRoutes);

module.exports = router;
