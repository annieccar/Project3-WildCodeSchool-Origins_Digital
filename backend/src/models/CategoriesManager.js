const AbstractManager = require("./AbstractManager");

class CategoriesManager extends AbstractManager {
  constructor() {
    super({ table: "category" });
  }

  insert(category) {
    return this.database.query(`INSERT INTO ${this.table} (title) VALUES (?)`, [
      category.title,
    ]);
  }

  update(category) {
    return this.database.query(
      `UPDATE ${this.table} SET title = ? WHERE id = ?`,
      [category.title, category.id]
    );
  }

  findVideos(id) {
    return this.database.query(`SELECT * FROM video WHERE category_id = ?`, [
      id,
    ]);
  }
}

module.exports = CategoriesManager;
