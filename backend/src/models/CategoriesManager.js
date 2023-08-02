const AbstractManager = require("./AbstractManager");

class CategoriesManager extends AbstractManager {
  constructor() {
    super({ table: "category" });
  }

  insert(category) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      category.title,
    ]);
  }

  update(category) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [category.title, category.id]
    );
  }
}

module.exports = CategoriesManager;
