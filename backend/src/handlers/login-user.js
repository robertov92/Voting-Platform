const { v4 } = require('uuid');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = db => {
    
    return async(request, response) => {
        const { email, password} = request.body;
    
    try{
        const existingUser = await  db.collection('users').find({email : email}).next();

        if(!existingUser) return response.status(404).json( {message: "User doesnt exist."});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        
        if(!isPasswordCorrect) return response.status(404).json( {message: "Invalid Credentials."});

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"});

        response.status(200).json({result: existingUser, token});
    }catch(error){
        response.status(500).json({message: 'Something went wrong.'});
    }

    }
}