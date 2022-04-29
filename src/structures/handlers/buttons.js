module.exports = async (client, PG, Ascii) => {
    const table = new Ascii("Buttons Loaded");
    const buttonFolder = await PG(`${process.cwd()}/src/buttons/**/*.js`);

    buttonFolder.map(async (file) => {
        const buttonFile = require(file);
        if(!buttonFile.id) return;

        client.buttons.set(buttonFile.id, buttonFile);
        table.addRow(buttonFile.id, "Loaded");
    });
    console.log(table.toString());
}