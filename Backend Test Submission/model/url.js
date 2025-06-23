const mongoose=require('mongoose');

const urlSchema=mongoose.Schema({
    shortenedUrl:{type:String},
    originalUrl:{type:String}
});

module.exports = mongoose.model("Urls", urlSchema)
