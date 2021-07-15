const { v4 } = require('uuid');

module.exports = db => {
    return async(request, response) => {
        const username = request.body.username
        const email = request.body.email
        const password = request.body.password

        let message;

        db.collection('users').findOne({ email: email })
            .then(user => {
                if (user) {
                    const error = new Error('Email already exist');
                    message = 'Email already in our records. Please use a different one'
                    error.statusCode = 401;
                    throw error;
                }
            }).catch(errors => {
                console.log(errors)
                return response.status(401).json([{ message }])
            })

        const data = {
            _id: v4(),
            username,
            email,
            password
        }

        await db.collection('users').insertOne(data);

        return response.json({
            message: 'User Created',
            userId: data._id,
            data
        });
    }
}