const router = require("express-promise-router")();
const filmController = require("../controllers/film");
const upload = require("./../middlewares/upload");
const { validate} = require("../helper/validate");


router.route('/')
    .get(filmController.getListFilm)
    .post(validate.validateFilm(),upload.single("image"),filmController.createFilm)

router.route('/:id')
    .get(validate.checkId(),filmController.getFilm)
    .put(validate.checkId(),validate.validateFilm(),upload.single("image"),filmController.updateFilm)
    .delete(validate.checkId(),filmController.deleteFilm)

router.route('/:id/type')
    .get(filmController.getTypeFilm)
    .post(filmController.addTypeFilm)

module.exports = router;
