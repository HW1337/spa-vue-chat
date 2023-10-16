const auth = require("./auth");
 
module.exports = {
 
    init: function (app, express) {
        const router = express.Router();
 
        router.post("/save", auth, async function (request, result) {
            const name = request.fields.name;
            const email = request.fields.email;
            const user = request.user;
 
            const contactUser = await db.collection("users").findOne({
                email: email
            });
 
            if (contactUser == null) {
                result.json({
                    status: "error",
                    message: "User not found."
                });
                return;
            }
 
            const userContact = await db.collection("users").findOne({
                $and: [{
                    _id: user._id
                }, {
                    "contacts._id": contactUser._id
                }]
            });
 
            if (userContact != null) {
                result.json({
                    status: "error",
                    message: "Contact already exists."
                });
                return;
            }
 
            await db.collection("users").findOneAndUpdate({
                _id: user._id
            }, {
                $push: {
                    contacts: {
                        _id: contactUser._id,
                        name: name,
                        email: email,
                        unreadMessages: 0
                    }
                }
            });
 
            result.json({
                status: "success",
                message: "Contact has been saved."
            });
        });
 
        app.use("/contact", router);
    }
};