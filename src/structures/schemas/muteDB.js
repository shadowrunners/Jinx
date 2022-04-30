const { model, Schema } = require('mongoose')

module.exports = model("MutedRole", new Schema({
    Guild: String,
    Role: String
}));
