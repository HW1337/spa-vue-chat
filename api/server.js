const express = require ("express");
const app = express();
const http = require("http").createServer(app);
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,Authorization");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

const expressFormidable = require("express-formidable");
app.use(expressFormidable());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "jwtSecret1234567890";

http.listen(process.env.PORT || 3000, function () {
    console.log("Server has been started at: "+ (process.env.PORT || 3000))
    MongoClient.connect("mongodb://localhost:27017", function (error, client) {
        if (error) {
            console.error(error);
            return;
        }
        const db = client.db("menv_chat_app");
        global.db = db;
        console.log("Database connected");
        app.post("/login", async function (request, result) {
 
            const email = request.fields.email;
            const password = request.fields.password;
         
            const user = await db.collection("users").findOne({
                "email": email
            });
         
            if (user == null) {
                result.json({
                    status: "error",
                    message: "Email does not exists."
                });
                return;
            }
         
            bcrypt.compare(password, user.password, async function (error, isVerify) {
                if (isVerify) {
         
                    const accessToken = jwt.sign({
                        "userId": user._id.toString()
                    }, jwtSecret);
         
                    await db.collection("users").findOneAndUpdate({
                        "email": email
                    }, {
                        $set: {
                            "accessToken": accessToken
                        }
                    });
         
                    result.json({
                        status: "success",
                        message: "Login successfully.",
                        accessToken: accessToken
                    });
         
                    return;
                }
         
                result.json({
                    status: "error",
                    message: "Password is not correct."
                });
            });
        });
        app.post("/registration", async function (request, result) {
            const name = request.fields.name;
            const email = request.fields.email;
            const password = request.fields.password;
            const createdAt = new Date().getTime();
     
            if (!name || !email || !password) {
                result.json({
                    status: "error",
                    message: "Please enter all values."
                });
                return;
            }
     
            var user = await db.collection("users").findOne({
                email: email
            });
     
            if (user != null) {
                result.json({
                    status: "error",
                    message: "Email already exists."
                });
                return;
            }

            bcrypt.hash(password, 10, async function (error, hash) {

                await db.collection("users").insertOne({
                    name: name,
                    email: email,
                    password: hash,
                    accessToken: "",
                    contacts: [],
                    notifications: [],
                    createdAt: createdAt
                });
     
                result.status(200).json({
                    status: "success",
                    message: "Account has been created. Please login now."
                });
            });
        });
    });
});