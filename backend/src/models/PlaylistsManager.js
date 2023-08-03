const AbstractManager = require("./AbstractManager");

class PlaylistsManager extends AbstractManager {
  constructor() {
    super({ table: "playlist" });
  }

  insert(playlist) {
    return this.database.query(`INSERT INTO ${this.table} (title) VALUES (?)`, [
      playlist.title,
    ]);
  }

  update(playlist) {
    return this.database.query(
      `UPDATE ${this.table} SET title = ? WHERE id = ?`,
      [playlist.title, playlist.id]
    );
  }
}

module.exports = PlaylistsManager;
