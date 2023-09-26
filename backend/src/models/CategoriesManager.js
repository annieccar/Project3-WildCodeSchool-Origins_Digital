const AbstractManager = require("./AbstractManager");

class CategoriesManager extends AbstractManager {
  constructor() {
    super({ table: "category" });
  }

  insert(category) {
    return this.database.query(`INSERT INTO ${this.table} (name) VALUES (?)`, [
      category.name,
    ]);
  }

  update(category) {
    return this.database.query(
      `UPDATE ${this.table} SET name = ? WHERE id = ?`,
      [category.name, category.id]
    );
  }

  findVideos(id) {
    return this.database.query(`SELECT * FROM video WHERE category_id = ?`, [
      id,
    ]);
  }
}

module.exports = CategoriesManager;
