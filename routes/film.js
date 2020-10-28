// const express = require("express");
const router = require("express-promise-router")();
const filmController = require("./../controllers/film");
const upload = require("./../middlewares/upload");

router.route('/')
    .get(filmController.getListFilm)
    .post(upload.single("image"),filmController.createFilm)

router.route('/:id')
    .get(filmController.getFilm)
    .put(upload.single("image"),filmController.updateFilm)
    .delete(filmController.deleteFilm)

module.exports = router;
