const User= require('../models/user.model');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
require('dotenv').config();
const config= require('../config/keys');
const authMessages= require('../helper/commonMessages');

// User SignUp
const singup= async(req, res)=>{
    try {
        const {username, email, password}= req.body;
        const userExist= await User.findOne({email});

        if(userExist){
            return res.status(401).json({message: authMessages.auth.userExists})
        }

        const hashedPassword= await bcrypt.hash(password, 10);

        const newUser= new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({message: authMessages.auth.signUpSuccess, newUser});  
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
}

// User Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(401).json({ message: authMessages.auth.userDoesNotExists });
        }

        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(401).json({ message: authMessages.auth.userDoesNotExists });
        }

        const token = jwt.sign({ id: userExist._id }, config.jwtAuthSecret, { expiresIn: '30d' });
        res.json({
            message: authMessages.auth.loginSuccess,
            token,
            user: {
                id: userExist._id,
                username: userExist.username,
                email: userExist.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fetch All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'username email'); // Fetch only username and email
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    singup,
    login,
    getAllUsers
};
