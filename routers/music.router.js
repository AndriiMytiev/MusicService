const Router = require("express");
const router = new Router();
const musicController = require("../controller/music.controller");

router.post("/music", musicController.createMusic);
router.get("/music", musicController.getMusic);
router.get("/music/:id", musicController.getOneMusic);
router.put("/music", musicController.updateMusic);
router.delete("/music/:id", musicController.deleteMusic);
router.delete("/musics/:id", musicController.deleteMusicByUser);

module.exports = router;
