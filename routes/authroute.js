const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const usermodel = require('../models/auth')

const secret = "Mynameisnipun";


router.post('/register', async(req,res)=>{
    try {
        const {name , email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);

    const result = await usermodel.create({
        Name:name,
        Email:email,
        Password:hashedPassword
    })

    console.log(result);

    res.status(200).json({ result });
    } catch (error) {
        console.log(error);
    }
})

router.post('/login',async (req,res)=>{

    try {
        const {Username,Password} = req.body;

        const user = await usermodel.findOne({Name:Username});
        console.log(user);
    
        if(user == null){
            return res.status(400).json({message:"Username not found.."})
        }
    
        const matchParrsword = await bcrypt.compare(Password,user.Password);
    
        if(!matchParrsword){
            return res.status(400).json({ message: "Invalid credentials" });
        }
    
        res.status(200).json({ result: user , isauth : true});
    } catch (error) {
        res.status(401).json("wrong")
    }

})

module.exports = router