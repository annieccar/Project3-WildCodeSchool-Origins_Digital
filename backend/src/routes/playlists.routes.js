const express = require("express");

const router = express.Router();

const playlistsControllers = require("../controllers/playlists.controllers");

router.get("/playlists", playlistsControllers.browse);
router.get("/playlists/:id", playlistsControllers.read);
router.put("/playlists/:id", playlistsControllers.edit);
router.post("/playlists", playlistsControllers.add);
router.delete("/playlists/:id", playlistsControllers.destroy);

module.exports = router;
