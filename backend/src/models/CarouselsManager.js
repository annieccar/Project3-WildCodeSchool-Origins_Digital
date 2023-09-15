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

  findVideos(id) {
    return this.database.query(
      `SELECT video.file_name FROM video 
    JOIN video_has_carousel ON video_has_carousel.video_id= video.id 
    JOIN carousel ON carousel.id=video_has_carousel.carousel_id
    WHERE carousel.id = ?`,
      [id]
    );
  }

  findVideosWithCarousselName() {
    return this.database.query(
      `SELECT video.id, name, file_name, carousel_id, carousel_name, category_id FROM video 
      JOIN video_has_carousel ON video_has_carousel.video_id= video.id 
      JOIN carousel ON carousel.id=video_has_carousel.carousel_id`
    );
  }
}

module.exports = CarouselsManager;
