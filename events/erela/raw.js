const client = require("../../index.js");

client.on("raw", d => client.manager.updateVoiceState(d))
