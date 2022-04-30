require('colors')
const mongoose = require("mongoose");
const { database } = require("../../config.json");

module.exports = async client => {   
      client.user.setActivity('Get Jinxed', { type: 'LISTENING' });
      console.log(`Discord API >> Logged in as ${client.user.tag}.`.magenta);

      client.manager.init(client.user.id);

      if (!database) return;
      mongoose.connect(database, {
          useNewUrlParser: true,
          useUnifiedTopology: true
      }).then(() => {
          console.log("[DB] >> Jinx has successfully connected to the database.")
      }).catch((err) => {
          console.log(err)
      });
};