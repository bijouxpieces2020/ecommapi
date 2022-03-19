const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//  register user
router.post("/register",async(req,res)=> {
    const newUser = new User (
        {
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
        });
//using crypoJS - the AES(advanced encryption standard)


//  catch an error and use async and await
      
     try{
        const savedUser = await newUser.save();
// send user to the client side.
       res.status(201).json(savedUser);
        
    }catch(err){

        res.status(500).json(err)
    }
});
//login
router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne(
            {
                userName: req.body.user_name
            }
        );
//incorrect username
        !user && res.status(401).json("Wrong User Name");
// decrypting password for login
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;
        //wrong password

        originalPassword != inputPassword && 
            res.status(401).json("Wrong Password");
//creating extra security with tokens helps to verify the client using the ID
        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}// YOU WONT BE ABLE TO USE THIS ACCESS TOKEN after 3 days
            
        );
//
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }

});
module.exports = router;