const BodyParser = require('body-parser');
const cors = require('cors');

module.exports = app => {
    app.use(BodyParser.json());
    app.use(cors());
}