const AbstractManager = require("./AbstractManager");

class PlaylistsManager extends AbstractManager {
  constructor() {
    super({ table: "playlist" });
  }

  insert(playlist) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      playlist.title,
    ]);
  }

  update(playlist) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [playlist.title, playlist.id]
    );
  }
}

module.exports = PlaylistsManager;
