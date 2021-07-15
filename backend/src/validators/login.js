const { validateAll } = require('indicative/validator');

module.exports = async(request, response, next) => {
    try {
        await validateAll(request.body, {
            email: 'required|email',
            password: 'required|string'
        });

        return next();
    } catch (errors) {
        console.log(errors)
        return response.status(422).json(errors);
    }
}