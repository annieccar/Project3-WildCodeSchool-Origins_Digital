const models = require("../models");

const browse = (req, res) => {
  models.videos
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.videos
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const video = req.body;

  // TODO validations (length, format...)

  video.id = parseInt(req.params.id, 10);

  models.videos
    .update(video)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const video = req.body;

  // TODO validations (length, format...)

  models.videos
    .insert(video)
    .then(([result]) => {
      res.location(`/videos/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.videos
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const search = (req, res) => {
  models.videos
    .findByQuery(req.query)
    .then(([videos]) => {
      if (videos.length !== 0) {
        res.status(202).send(videos);
      } else {
        res.status(500);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Your search didn't correspond to a video.");
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  search,
};
