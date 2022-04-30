const client = require("../../index.js");

module.exports = {
    name: "nodeDisconnect",
    run: client.manager.on("nodeDisconnect", (node, error) => {
        console.log(`[Erela] >> Lost connection to "${node.options.identifier}" due to an error: ${error.message}.`)
    })
};




