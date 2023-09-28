const models = require("../models");

const browse = async (req, res) => {
  try {
    const [rows] = await models.playlists.findAll();
    if (rows) {
      res.send(rows);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const browseByUser = async (req, res) => {
  try {
    const [rows] = await models.playlists.findPlaylistsByUser(req.params.id);
    if (rows) {
      res.send(rows);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const browseVideos = async (req, res) => {
  try {
    const [rows] = await models.playlists.findPlaylistVideos(req.params.id);
    if (rows) {
      res.send(rows);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const browseAllVideos = async (req, res) => {
  try {
    const [playlists] = await models.playlists.findPlaylistsByUser(
      req.params.id
    );

    const result = await Promise.all(
      playlists.map(async (playlist) => {
        const [videoDetails] = await models.playlists.findPlaylistVideos(
          playlist.id
        );
        return {
          ...playlist,
          videos: videoDetails,
        };
      })
    );

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const read = async (req, res) => {
  try {
    const [rows] = await models.playlists.find(req.params.id);
    if (rows[0] == null) {
      res.sendStatus(404);
    } else {
      res.send(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const edit = async (req, res) => {
  try {
    const playlist = req.body;

    // TODO validations (length, format...)

    playlist.id = parseInt(req.params.id, 10);

    const [result] = await models.playlists.update(playlist);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  try {
    const playlist = req.body;

    // TODO validations (length, format...)

    const [result] = await models.playlists.insert(playlist);
    if (result) {
      res.location(`/playlists/${result.insertId}`).sendStatus(201);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const addVideoHasPlaylist = async (req, res) => {
  try {
    const [result] = await models.playlists.insertVideoHasPlaylist(req.body);
    if (result) {
      res.sendStatus(201);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const destroy = async (req, res) => {
  try {
    const [result] = await models.playlists.delete(req.params.id);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const destroyVideo = async (req, res) => {
  try {
    const [result] = await models.playlists.deleteVideo(req.body);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  browse,
  browseByUser,
  browseVideos,
  browseAllVideos,
  read,
  edit,
  add,
  addVideoHasPlaylist,
  destroy,
  destroyVideo,
};
