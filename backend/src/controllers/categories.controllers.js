const models = require("../models");

const browse = async (req, res) => {
  try {
    const [rows] = await models.categories.findAll();
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
    const [rows] = await models.categories.find(req.params.id);
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
    const category = req.body;

    // TODO validations (length, format...)

    category.id = parseInt(req.params.id, 10);

    const [result] = await models.categories.update(category);
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
    const category = req.body;

    // TODO validations (length, format...)

    const [result] = await models.categories.insert(category);
    if (result) {
      res.location(`/categories/${result.insertId}`).sendStatus(201);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const destroy = async (req, res) => {
  try {
    const [result] = await models.categories.delete(req.params.id);
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
    const [rows] = await models.categories.findVideos(req.params.id);
    if (rows) {
      res.send(rows);
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
