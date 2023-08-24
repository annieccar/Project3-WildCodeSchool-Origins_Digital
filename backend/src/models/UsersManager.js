const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert({
    username,
    firstname,
    lastname,
    birthdate,
    gender,
    email,
    password,
  }) {
    return this.database.query(
      `INSERT INTO ${this.table} (username, firstname, lastname, birthdate, gender, email, password, profileimage, usertype_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? )`,
      [
        username,
        firstname,
        lastname,
        birthdate,
        gender,
        email,
        password,
        null,
        1,
      ]
    );
  }

  update(user) {
    return this.database.query(
      `UPDATE ${this.table} SET title = ? WHERE id = ?`,
      [user.title, user.id]
    );
  }

  findOneByEmail(email) {
    return this.database.query(
      "select id, firstname, lastname, birthdate, gender, email, password, profileimage, usertype_id from user where email = ?",
      [email]
    );
  }
}

module.exports = UsersManager;
