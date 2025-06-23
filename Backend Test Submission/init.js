const mongoose=require('mongoose');

async function mongoConnect(uri) {
    await mongoose.connect(uri);
}

module.exports = mongoConnect;
