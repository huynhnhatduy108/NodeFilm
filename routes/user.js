// const express = require("express");
const router = require("express-promise-router")();
const { validate} = require("../helper/validate");
const userController = require("./../controllers/user");
const passport = require("passport");
const passportMiddle = require("./../middlewares/passport");


router.route('/')
    .get(userController.getListUser)
    .post(userController.createUser)

router.route("/register")
    .post(userController.register)

router.route("/login")
    .post(validate.validateSignin(),passport.authenticate("local",{session:false}),userController.login)

router.route("/profile")
    .get(userController.profile)

router.route("/serect")
    .post(passport.authenticate("jwt",{session:false}),userController.serect)

router.route("/auth/google")
    .post(passport.authenticate("google-plus-token",{session:false}),userController.authGoogle)

router.route('/:id')
    .get(validate.checkId(),userController.getUser)
    .put(validate.validateSignin(),validate.checkId(),userController.updateUser)
    .delete(validate.checkId(),userController.deleteUser)


module.exports = router;
