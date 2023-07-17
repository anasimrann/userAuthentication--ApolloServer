const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    text: String,
    createdAt: String,
    createdBy: String
});


const Message = mongoose.model("Message",messageSchema);
module.exports = Message;



