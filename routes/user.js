// const express = require("express");
const router = require("express-promise-router")();
const userController = require("./../controllers/user");

router.route('/')
    .get(userController.getListUser)
    .post(userController.createUser)

router.route('/:id')
    .get(userController.getUser)
    // .put(userController)
    // .delete(userController)

module.exports = router;
