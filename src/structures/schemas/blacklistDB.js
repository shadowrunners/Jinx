const { model, Schema } = require("mongoose");

module.exports = new model("BlacklistDB", new Schema({
    UserID: String
}))