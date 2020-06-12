const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "projectDatas"
    }],
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs"
    }]
})

module.exports = mongoose.model("Auth", authSchema);
