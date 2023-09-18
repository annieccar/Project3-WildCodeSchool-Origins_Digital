const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findUsertypes() {
    return this.database.query(`SELECT * FROM usertype`);
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO ${this.table} (username, firstname, lastname, birthdate, gender, email, hashedPassword, profileimage, usertype_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? )`,
      [
        user.username,
        user.firstname,
        user.lastname,
        user.birthdate,
        user.gender,
        user.email,
        user.hashedPassword,
        user.profileimage,
        user.usertype_id,
      ]
    );
  }

  update(user) {
    return this.database.query(
      `UPDATE ${this.table} SET username = ?, firstname = ?, lastname = ?, email = ?, hashedPassword = ?, profileimage = ?, usertype_id = ? WHERE id = ?`,
      [
        user.username,
        user.firstname,
        user.lastname,
        user.email,
        user.hashedPassword,
        user.profileimage,
        user.usertype_id,
        user.id,
      ]
    );
  }

  updateUserType(user) {
    return this.database.query(
      `UPDATE ${this.table} SET usertype_id = ? WHERE id = ?`,
      [user.usertype_id, user.id]
    );
  }

  findOneByEmail(email) {
    return this.database.query(
      "select id, username, firstname, lastname, birthdate, gender, email, hashedPassword, profileimage, usertype_id from user where email = ?",
      [email]
    );
  }
}

module.exports = UsersManager;
