const AbstractManager = require("./AbstractManager");

class VideosManager extends AbstractManager {
  constructor() {
    super({ table: "video" });
    // this.category;
  }

  insert({ name, fileName, duration, details, categoryId }) {
    return this.database.query(
      `INSERT INTO ${this.table} (name, file_name, duration, details, category_id) VALUES (?, ?, ?, ?, ?)`,
      [name, fileName, duration, details, categoryId]
    );
  }

  update({ id, name, duration, details, categoryId }) {
    return this.database.query(
      `UPDATE ${this.table} SET name = ?, duration = ?, details = ?, category_id = ? WHERE id = ?`,
      [name, duration, details, categoryId, id]
    );
  }

  findByQuery(query) {
    const initialSql = `SELECT t.id, t.name, t.file_name, t.duration, t.details, t.category_id, c.name AS category FROM ${this.table} AS t JOIN category AS c ON c.id = t.category_id`;
    const where = [];

    if (query.id != null) {
      where.push({
        column: "t.id",
        value: query.id,
        operator: "=",
      });
    }

    if (query.name != null) {
      where.push({
        column: "t.name",
        value: `%${query.name}%`,
        operator: "LIKE",
      });
    }

    if (query.duration != null) {
      where.push({
        column: "t.duration",
        value: query.duration,
        operator: "=",
      });
    }

    if (query.details != null) {
      where.push({
        column: "t.details",
        value: `%${query.details}%`,
        operator: "LIKE",
      });
    }

    if (query.category_Id != null) {
      where.push({
        column: "t.category_id",
        value: query.category_Id,
        operator: "=",
      });
    }

    if (query.category != null) {
      where.push({
        column: "c.name",
        value: query.category,
        operator: "=",
      });
    }

    return this.database.query(
      where.reduce(
        (sql, { column, operator }, index) =>
          `${sql} ${index === 0 ? "WHERE" : "AND"} ${column} ${operator} ? `,
        initialSql
      ),
      where.map(({ value }) => value)
    );
  }
}

module.exports = VideosManager;
