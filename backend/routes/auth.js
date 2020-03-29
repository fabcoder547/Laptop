const express = require('express');
const router = express.Router();
const {
    check
} = require('express-validator');
const {
    signup,
    signout,
    signin
} = require('../controllers/auth')

// SIGNUP :: POST :: PUBLIC
router.post('/signup', [
    check('name').isLength({
        min: 3
    }).withMessage("name should be atleast of 3 characters"),
    check("email").isEmail().withMessage("email is required"),
    check("password").isLength({
        min: 3
    }).withMessage("Password should be of atleast 3 charaters")
], signup)

// SIGNIN ::POST ::PUBLIC
router.post('/signin', [
    check("email").isEmail().withMessage("EMAIL IS REQUIRED"),
    check("password").isLength(1).withMessage("Password is required"),
], signin)

router.get('/signout', signout)

module.exports = router;