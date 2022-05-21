const { Events } = require("./validation/eventnames");

module.exports = async(client, PG, Ascii) => {
    const Table = new Ascii("Events Loaded");

    (await PG(`${process.cwd()}/src/events/*/*.js`)).map(async (file) => {
        const event = require(file);

        if (event.name) {
            if(!Events.includes(event.name))
            return Table.addRow(file.split("/")[7], "🔸 FAILED", "Event name is missing.");
        }

        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        };

        await Table.addRow(event.name, "🔷 Successfully loaded event.")
    });
    console.log(Table.toString());
}