const db = require("../db");

class MusicController {
  async createMusic(req, res) {
    const { user, title, fileName, author, tags } = req.body;
    const newMusic = await db.query(
      'INSERT INTO music ("user", title, "fileName", author, tags) values ($1, $2, $3, $4, $5) RETURNING *',
      [user, title, fileName, author, tags],
    );
    res.json(newMusic.rows[0]);
  }

  async getMusic(req, res) {
    const music = await db.query("SELECT * FROM music");
    res.json(music.rows);
  }

  async getOneMusic(req, res) {
    const id = req.params.id;
    const music = await db.query("SELECT * FROM music WHERE id = $1", [id]);
    res.json(music.rows[0]);
  }

  async updateMusic(req, res) {
    const { id, user, title, fileName, author, tags } = req.body;
    console.log("Оновлення музики з ID:", id);

    // Додайте виведення в консоль для відлагодження отриманих даних
    console.log("Отримані дані:", req.body);
    const music = await db.query(
      'UPDATE music SET "user" = $1, title = $2, "fileName" = $3, author = $4, tags = $5 WHERE id = $6 RETURNING *',
      [user, title, fileName, author, tags, id],
    );

    res.json(music.rows[0]);
  }

  async deleteMusic(req, res) {
    const id = req.params.id;
    const music = await db.query("DELETE FROM music WHERE id = $1", [id]);
    res.json(music.rows[0]);
  }

  async deleteMusicByUser(req, res) {
    const id = req.params.id;
    const music = await db.query(`DELETE FROM music WHERE "user" = $1`, [id]);
    res.json(music.rows[0]);
  }
}

module.exports = new MusicController();
