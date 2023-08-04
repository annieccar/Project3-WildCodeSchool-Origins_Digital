const express = require("express");

const router = express.Router();

const playlistsControllers = require("../controllers/playlists.controllers");

router.get("/", playlistsControllers.browse);
router.get("/:id", playlistsControllers.read);
router.put("/:id", playlistsControllers.edit);
router.post("/", playlistsControllers.add);
router.delete("/:id", playlistsControllers.destroy);

module.exports = router;
