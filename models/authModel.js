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
    blogs: [{
        blogId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blogs",
            required: true
        }
    }]
})

module.exports = mongoose.model("Auth", authSchema);