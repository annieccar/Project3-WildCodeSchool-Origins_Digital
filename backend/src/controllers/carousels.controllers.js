const models = require("../models");

const browse = async (req, res) => {
  try {
    const [rows] = await models.carousels.findAll();
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
  // console.log("read req body : ", req.body);
  try {
    const [rows] = await models.carousels.find(req.params.id);
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
    const carousel = req.body;

    // TODO validations (length, format...)

    carousel.id = parseInt(req.params.id, 10);

    const [result] = await models.carousels.update(carousel);

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
  // console.log(req.body);
  try {
    const [result] = await models.carousels.insert(req.body);

    if (result) {
      res.location(`/carousels/${result.insertId}`).sendStatus(201);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const destroy = async (req, res) => {
  try {
    const [result] = await models.carousels.delete(req.params.id);
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

const readVideos = async (req, res) => {
  try {
    const [rows] = await models.carousels.findVideos(req.params.id);
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

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  readVideos,
};
