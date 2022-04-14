// const { MongoClient } = require('mongodb');

// let dbConnection;

// module.exports = {
//     connectToDb: (cb) => {
//         MongoClient.connect('mongodb://localhost:27017/a_ali')
//         .then((client) => {
//             dbConnection = client.db()
//             return cb()
//         })
//         .catch((err) => {
//             console.log(err);
//             return cb(err)
//         })
//     },
//     getDb: () => dbConnection
// }

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    body: {
      type: String,
      required: true
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
