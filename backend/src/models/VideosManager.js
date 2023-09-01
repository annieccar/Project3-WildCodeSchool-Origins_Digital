const AbstractManager = require("./AbstractManager");

class VideosManager extends AbstractManager {
  constructor() {
    super({ table: "video" });
  }

  insert({ name, duration, details, categoryId }) {
    return this.database.query(
      `INSERT INTO ${this.table} (name, duration, details, category_id) VALUES (?, ?, ?, ?)`,
      [name, duration, details, categoryId]
    );
  }

  update({ id, name, duration, details, categoryId }) {
    return this.database.query(
      `UPDATE ${this.table} SET name = ?, duration = ?, details = ?, category_id = ? WHERE id = ?`,
      [name, duration, details, categoryId, id]
    );
  }
}

module.exports = VideosManager;
