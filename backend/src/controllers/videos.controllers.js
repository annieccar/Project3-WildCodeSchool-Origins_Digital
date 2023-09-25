const models = require("../models");

const browse = async (req, res) => {
  try {
    const [rows] = await models.videos.findAll();
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

const read = async (req, res) => {
  try {
    const [rows] = await models.videos.find(req.params.id);
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
    const video = req.body;

    // TODO validations (length, format...)

    video.id = parseInt(req.params.id, 10);

    const [result] = await models.videos.update(video);
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

const editCategory = async (req, res) => {
  try {
    const [result] = await models.videos.updateCategory(req.body);
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
    const video = req.body;

    // TODO validations (length, format...)

    const [result] = await models.videos.insert(video);
    if (result) {
      res.location(`/videos/${result.insertId}`).sendStatus(201);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const destroy = async (req, res) => {
  try {
    const [result] = await models.videos.delete(req.params.id);
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

const search = async (req, res) => {
  try {
    const [videos] = await models.videos.findByQuery(req.query);
    if (videos.length !== 0) {
      res.status(202).send(videos);
    } else {
      res.status(500);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Your search didn't correspond to a video.");
  }
};

module.exports = {
  browse,
  read,
  edit,
  editCategory,
  add,
  destroy,
  search,
};
