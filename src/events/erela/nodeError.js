const client = require("../../structures/index.js");

module.exports = {
    name: "nodeError",
    run: client.manager.on("nodeError", (node, error) => {
        console.log(`[Erela] >> Node "${node.options.identifier}" has encountered an error: ${error.message}.`)
    })
};
