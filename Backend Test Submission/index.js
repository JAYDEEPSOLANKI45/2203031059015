const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.urlencoded({extended:true}))
require("dotenv").config();
const Url=require("./model/url.js");
const crypto = require("crypto");

// connect with mongoDB Atlas
const mongoConnect = require("./init.js");
mongoConnect(process.env.MONGODB_URI)
  .then(() => console.log("Connected with ATLAS"))
  .catch((err) => console.log(err));

app.post("/shorten",async (req,res)=>{
    let originalUrl=req.body.url;
    // hashing algorithm
    const hash = crypto.createHash('sha256').update(originalUrl + Date.now()).digest('base64url').slice(0, 8);
    const shortenedUrl = `${process.env.PREFIX}/${hash}`;
    console.log(shortenedUrl);
    const url=await Url.findOne({shortenedUrl:shortenedUrl});
    if(url)
    {
        return res.send(url.originalUrl);
    }
    const newUrl=new Url({originalUrl,shortenedUrl});
    await newUrl.save();
    return res.status(200).json({shortenedUrl:{shortenedUrl}});
});

app.get("/:shortened", async (req, res) => {
    const shortenedUrl = `${process.env.PREFIX}/${req.params.shortened}`;
    const url = await Url.findOne({ shortenedUrl: shortenedUrl });
    if (url) {
        return res.redirect(url.originalUrl);
    }
    res.status(404).send("Shortened URL not found");
});

app.listen(8080, () => {
  console.log("Listening on 8080");
});
