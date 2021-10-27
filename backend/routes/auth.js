const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcryptjs');
const {registerValidation, loginValidation }= require ('../validation');


router.post('/register', async (req, res) => {
//    //lets validate the data before we a user
     const {error} = registerValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message);

//     //checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

//     //hash passwords
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt);
 

    const user = new User({
         name: req.body.name,
         email: req.body.email,
         password: hashedPassword,
         role:"USER"
     });
    try{
        const savedUser =  await user.save();
        res.send(savedUser);

    }catch(err){
        res.status(400).send(err);
    }
});


//LOGIN

router.post('/login', async (req,res) => {
    //LETS VALIDATE THE DATA BEFORE WE A USER
    const { error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //checking if the email exists
    const user = await User.findOne({ email : req.body.email});
    if (!user) return res.status(400).send('Email is not Found');

    //PASSWORD IS CORRECT 
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password')

    //create and assign a token
    const token = jwt.sign({_id: user._id,role:user.role,email:user.email,name:user.name}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

})


module.exports = router;