const client = require("../../structures/index.js");

module.exports = {
    name: "nodeCreate",
    run: client.manager.on("nodeConnect", node => {
        console.log(`[Erela] >> Connection has been established to "${node.options.identifier}".`)
    })
};




