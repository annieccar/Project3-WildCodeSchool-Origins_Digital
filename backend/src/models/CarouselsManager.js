const AbstractManager = require("./AbstractManager");

class CarouselsManager extends AbstractManager {
  constructor() {
    super({ table: "carousel" });
  }

  insert(carousel) {
    return this.database.query(`INSERT INTO ${this.table} (title) VALUES (?)`, [
      carousel.title,
    ]);
  }

  update(carousel) {
    return this.database.query(
      `UPDATE ${this.table} SET title = ? WHERE id = ?`,
      [carousel.title, carousel.id]
    );
  }
}

module.exports = CarouselsManager;
