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

  insertJointure({ carouselId, idAdded }) {
    const initialSql = `INSERT INTO video_has_carousel (video_id, carousel_id) VALUES`;
    const values = [];
    idAdded.map((value) => values.push(value.video_id, carouselId));

    return this.database.query(
      `${initialSql}${values.map((value, index) =>
        index % 2 === 0 ? " (?" : " ?)"
      )}`,
      values
    );
  }

  deleteJointure({ carouselId, idRemoved }) {
    const initialSql = `DELETE FROM video_has_carousel WHERE carousel_id = ? AND (`;
    const values = [carouselId];
    idRemoved.map((value) => values.push(value.video_id));

    return this.database.query(
      `${initialSql}${values.map(
        (value, index) =>
          (index === 1 ? "video_id = ?" : null) ||
          (index > 1 ? " OR video_id = ?" : null)
      )})`.replaceAll(",", ""),
      values
    );
  }

  selectVideosByCarouselId(id) {
    return this.database.query(
      `select title, carousel.id, video_id from carousel left join video_has_carousel on carousel.id = video_has_carousel.carousel_id where carousel.id = ?`,
      [id]
    );
  }

  update(carousel) {
    return this.database.query(
      `UPDATE ${this.table} SET title = ? WHERE id = ?`,
      [carousel.title, carousel.id]
    );
  }

  findByCarouselTitle(title) {
    return this.database.query(`select * from  ${this.table} where title = ?`, [
      title,
    ]);
  }

  findVideos(id) {
    return this.database.query(
      `SELECT video.id, video.file_name FROM video 
    JOIN video_has_carousel ON video_has_carousel.video_id= video.id 
    JOIN carousel ON carousel.id=video_has_carousel.carousel_id
    WHERE carousel.id = ?`,
      [id]
    );
  }

  findVideosWithCarousselName() {
    return this.database.query(
      `SELECT video.id, name, file_name, carousel_id, title, category_id FROM video 
      JOIN video_has_carousel ON video_has_carousel.video_id= video.id 
      JOIN carousel ON carousel.id=video_has_carousel.carousel_id`
    );
  }
}

module.exports = CarouselsManager;
