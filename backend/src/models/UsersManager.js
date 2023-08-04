const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(`INSERT INTO ${this.table} (title) VALUES (?)`, [
      user.title,
    ]);
  }

  update(user) {
    return this.database.query(
      `UPDATE ${this.table} SET title = ? WHERE id = ?`,
      [user.title, user.id]
    );
  }
}

module.exports = UsersManager;
