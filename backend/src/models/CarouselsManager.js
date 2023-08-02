const AbstractManager = require("./AbstractManager");

class CarouselsManager extends AbstractManager {
  constructor() {
    super({ table: "carousel" });
  }

  insert(carousel) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      carousel.title,
    ]);
  }

  update(carousel) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [carousel.title, carousel.id]
    );
  }
}

module.exports = CarouselsManager;
