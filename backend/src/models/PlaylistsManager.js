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
      `SELECT p.id, p.name name, COUNT(vp.playlist_id) count FROM ${this.table} p LEFT JOIN video_has_playlist vp ON p.id = vp.playlist_id WHERE p.user_id = ? GROUP BY 
p.name, p.id`,
      [id]
    );
  }

  insertVideoHasPlaylist(body) {
    return this.database.query(
      `INSERT INTO video_has_playlist (video_id, playlist_id) VALUES (?, ?)`,
      [body.video_id, body.playlist_id]
    );
  }

  findPlaylistVideos(id) {
    return this.database.query(
      `SELECT v.* FROM video v JOIN video_has_playlist vp ON v.id = vp.video_id WHERE vp.playlist_id = ? LIMIT 10`,
      [id]
    );
  }
}

module.exports = PlaylistsManager;
