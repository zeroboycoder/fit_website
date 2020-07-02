const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectType: {
        type: String,
        required: true
    },
    projectTitle: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    iconUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    downloadLink: {
        type: String
    },
    sourceCodeLink: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("projectDatas", projectSchema);