const Mongodb = require('mongodb');

const uri = 'mongodb+srv://roberto:Unoyuno5@cluster0.zwdeu.mongodb.net/Project2?retryWrites=true&w=majority';

module.exports = async() => {
    const client = new Mongodb.MongoClient(uri, {
        useUnifiedTopology: true
    });
    await client.connect();

    return client.db();
}