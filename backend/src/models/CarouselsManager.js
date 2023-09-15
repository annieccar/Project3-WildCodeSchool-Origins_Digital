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

  selectVideosByCarouselId(id) {
    return this.database.query(
      `SELECT c.id AS carousel_id, c.title AS carousel_name, v.name AS video_name, vhc.carousel_id AS join_id FROM ${this.table} AS c
      INNER JOIN video_has_carousel AS vhc ON c.id = vhc.carousel_id
      RIGHT JOIN video AS v ON vhc.video_id = v.id
      WHERE c.id = ?
      OR vhc.carousel_id IS NULL`,
      [id]
    );
  }

  update(carousel) {
    return this.database.query(
      `UPDATE ${this.table} SET title = ? WHERE id = ?`,
      [carousel.title, carousel.id]
    );
  }

  findVideos(id) {
    return this.database.query(
      `SELECT video.name FROM video 
    JOIN video_has_carousel ON video_has_carousel.video_id= video.id 
    JOIN carousel ON carousel.id=video_has_carousel.carousel_id
    WHERE carousel.id = ?`,
      [id]
    );
  }
}

module.exports = CarouselsManager;
