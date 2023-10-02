const fs = require("node:fs");
const path = require("node:path");
const models = require("../models");
const { unparse } = require("../helpers/papaparseHelper");

const browse = async (req, res) => {
  try {
    const [rows] = await models.users.findAll();
    if (rows) {
      const users = rows.map((row) => {
        const { hashedPassword, ...infos } = row;
        return infos;
      });
      res.send(users);
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
    const [rows] = await models.users.find(req.params.id);
    if (!rows[0]) {
      res.sendStatus(404);
    } else {
      delete rows[0].hashedPassword;
      res.send(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const edit = async (req, res) => {
  try {
    const user = req.body;

    if (req.file) {
      user.profileimage = req.file.filename;
    } else {
      user.profileimage = null;
    }
    user.id = parseInt(req.params.id, 10);

    const [result] = await models.users.update(user);
    if (result.affectedRows) {
      res.status(201).json({ id: result.insertId, ...req.body });
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const editByAdmin = async (req, res) => {
  try {
    const user = req.body;

    user.id = parseInt(req.params.id, 10);

    const [result] = await models.users.updateByAdmin(user);
    if (result.affectedRows) {
      res.status(201).json({ id: result.insertId, ...req.body });
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const editUserTypeID = async (req, res) => {
  try {
    const user = req.body;

    user.id = parseInt(req.params.id, 10);

    const [result] = await models.users.updateUserType(user);
    if (result.affectedRows) {
      res.status(201).json({ id: result.insertId, ...req.body });
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  try {
    const user = req.body;

    const [result] = await models.users.insert(user);
    if (result) {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const destroy = async (req, res) => {
  try {
    const [result] = await models.users.delete(req.params.id);
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

const browseUsertypes = async (req, res) => {
  try {
    const [usertypes] = await models.users.findUsertypes();
    if (usertypes) {
      res.status(200).send(usertypes);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const usersToCSV = async (req, res) => {
  try {
    let [users] = await models.users.findAll();

    users = users.map((user) => {
      const { hashedPassword, profileimage, ...infos } = user;
      return infos;
    });

    const csv = unparse(users);

    fs.writeFileSync(path.join(__dirname, "../../public/csv/users.csv"), csv);
    res.sendStatus(204);
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
  editByAdmin,
  editUserTypeID,
  browseUsertypes,
  usersToCSV,
};
