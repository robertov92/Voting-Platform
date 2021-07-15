const { v4 } = require('uuid');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = db => {
    
    return async(request, response) => {
        const {email, password, confirmPassword, firstname, lastname} = request.body;

        const existingUser = await  db.collection('users').find({email : email}).next();

        if(existingUser) return response.status(404).json( {message: "User already exists"});
        
        if(password !== confirmPassword) return res.status(404).json( {message: "Password dont match."});

        const hashedPassword = await bcrypt.hash(password, 12);

        const token = jwt.sign({email: email}, 'test', {expiresIn: "1h"});
        const result = {
            email: request.body.email,
            password: hashedPassword,
            firstname: firstname,
            lastname: lastname,
            name: firstname + ' ' + lastname,
            _id: v4()
        }

        await db.collection('users').insertOne(result);

        return response.json({
            result,
            token
        });


    }
}