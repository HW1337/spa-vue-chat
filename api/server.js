const express = require ("express");
const app = express();
const http = require("http").createServer(app);
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectId;
http.listen(process.env.PORT || 3000, function () {
    console.log("Server has been started at: "+ (process.env.PORT || 3000));
    MongoClient.connect("mongodb://localhost:27017", function (error, client) {
        if (error) {
            console.error(error);
            return;
        }
        db = client.db("menv_chat_app");
        global.db = db;
        console.log("Database connected");
    });
});