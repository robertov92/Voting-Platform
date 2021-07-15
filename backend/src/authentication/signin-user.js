const jwt = require('jsonwebtoken');

module.exports = db => {
    return async(request, response) => {
        const email = request.body.email;
        const password = request.body.password;

        let loadedUser;
        let message;

        db.collection('users').findOne({ email: email })
            .then(user => {
                if (!user) {
                    const error = new Error('User with this email could not be found');
                    message = 'User with this email could not be found'
                    error.statusCode = 401;
                    throw error;

                }
                loadedUser = user;
                return password === user.password;

            }).then(isEqual => {
                if (!isEqual) {
                    const error = new Error('Wrong Password');
                    message = 'Please verify your password';
                    error.statusCode = 401;
                    throw error;
                }
                const token = jwt.sign({
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                }, 'secret', { expiresIn: '1h' });

                response.status(200).json({ token: token, userId: loadedUser._id.toString() });

            }).catch(errors => {
                console.log(errors)
                return response.status(401).json([{ message }])
            })
    }
}