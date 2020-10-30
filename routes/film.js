const router = require("express-promise-router")();
const filmController = require("./../controllers/film");
const upload = require("./../middlewares/upload");
const { validate} = require("../helper/validate");


router.route('/')
    .get(filmController.getListFilm)
    .post(validate.validateFilm(),upload.single("image"),filmController.createFilm)

router.route('/:id')
    .get(filmController.getFilm)
    .put(upload.single("image"),filmController.updateFilm)
    .delete(filmController.deleteFilm)

module.exports = router;
