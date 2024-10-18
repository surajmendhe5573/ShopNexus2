const express= require('express');
const router= express.Router();
const {singup, login, getAllUsers}= require('../controllers/user.controller');

router.post('/signup', singup);
router.post('/login', login);
router.get('/list', getAllUsers);

module.exports= router;