const client = require("../../structures/index.js");
const { MessageEmbed } = require("discord.js");
const actualTime = require("humanize-duration");

client.manager
    .on("nodeConnect", (node) => {
        console.log(`[Erela] >> Connection has been established to "${node.options.identifier}".`)
    })

    .on("nodeDisconnect", (node, error) => {
        console.log(`[Erela] >> Lost connection to "${node.options.identifier}" due to an error: ${error.message}.`)
    })

    .on("nodeError", (node, error) => {
        console.log(`[Erela] >> Node "${node.options.identifier}" has encountered an error: ${error.message}.`)
    })