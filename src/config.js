const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Login");

connect.then(() => {
    console.log("Database connected ");
})
.catch(() => {
    console.log("Database not connected");
})

// create a schema

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    scores: {
        keysprint: {type: Number, default: 0},
        quizcode: {
            c: {type: Number, default: 0},
            cpp: {type: Number, default: 0},
            java: {type: Number, default: 0},
            python: {type: Number, default: 0},
            javascript: {type: Number, default: 0},
            typescript: {type: Number, default: 0}
        },
        output: {
            c: {type: Number, default: 0},
            cpp: {type: Number, default: 0},
            java: {type: Number, default: 0},
            python: {type: Number, default: 0},
            javascript: {type: Number, default: 0},
            typescript: {type: Number, default: 0}
        }
    }
});

//collection part
const collection = new mongoose.model("users" , UserSchema);

module.exports = collection;