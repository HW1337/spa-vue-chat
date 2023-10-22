const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
 
const auth = require("./auth");
const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; 
const key = "my-secret-key-for-chat-project"; 

let encrypt = function (text) {
    const iv = crypto.randomBytes(16);
     
    const message = text;
 
    const cipher = crypto.createCipheriv(algorithm, key, iv);
 
    let encryptedData = cipher.update(message, "utf-8", "hex");
    encryptedData += cipher.final("hex");
 
    const base64data = Buffer.from(iv, 'binary').toString('base64');
    return {
        iv: base64data,
        encryptedData: encryptedData
    };
};
 
module.exports = {
 
    init: function (app, express) {
        const self = this;
        const router = express.Router();
        router.post("/send", auth, async function (request, result) {
            const user = request.user;
            const email = request.fields.email;
            const message = request.fields.message;
            const createdAt = new Date().getTime();
         
            if (!email || !message) {
                result.json({
                    status: "error",
                    message: "Please enter all fields."
                });
                return;
            }
         
            const hw = encrypt(message);
         
            const receiver = await db.collection("users").findOne({
                email: email
            });
         
            if (receiver == null) {
                result.json({
                    status: "error",
                    message: "The receiver is not a member of Chat Station."
                });
                return;
            }
         
            const object = {
                message: hw,
                sender: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                },
                receiver: {
                    _id: receiver._id,
                    name: receiver.name,
                    email: receiver.email
                },
                isRead: false,
                createdAt: createdAt
            };
            const document = await db.collection("messages").insertOne(object);
         
            await db.collection("users").findOneAndUpdate({
                $and: [{
                    "_id": receiver._id
                }, {
                    "contacts._id": user._id
                }]
            }, {
                $inc: {
                    "contacts.$.unreadMessages": 1
                }
            });
         
            const messageObject = {
                _id: document.insertedId,
                message: message,
                sender: object.sender,
                receiver: object.receiver,
                isRead: false,
                createdAt: createdAt
            };
         
            result.json({
                status: "success",
                message: "Message has been sent.",
                messageObject: messageObject
            });
        });
        app.use("/chat", router);
    }
};