const AbstractManager = require("./AbstractManager");

class PlaylistsManager extends AbstractManager {
  constructor() {
    super({ table: "playlist" });
  }

  insert(playlist) {
    return this.database.query(
      `INSERT INTO ${this.table} (name, user_id) VALUES (?, ?)`,
      [playlist.name, playlist.user_id]
    );
  }

  update(playlist) {
    return this.database.query(
      `UPDATE ${this.table} SET name = ? WHERE id = ?`,
      [playlist.name, playlist.id]
    );
  }

  findPlaylistsByUser(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE user_id = ?`,
      [id]
    );
  }

  insertVideoHasPlaylist(body) {
    return this.database.query(
      `INSERT INTO video_has_playlist (video_id, playlist_id) VALUES (?, ?)`,
      [body.video_id, body.playlist_id]
    );
  }
}

module.exports = PlaylistsManager;
