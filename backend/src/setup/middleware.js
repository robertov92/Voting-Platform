const BodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session')

module.exports = app => {
    app.use(BodyParser.json());
    app.use(cors());
    

}