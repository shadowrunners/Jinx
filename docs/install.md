## Installation Guide
1. Create a bot on the [Discord Developer Portal](https://discordapp.com/developers/).
2. Turn on **Server Members Intent** and **Presence Intent**in the bot's settings page on the developer portal.
3. Install Node.js 17.
4. Download the latest version of the bot's source code. (Green button with the text "Code" then "Download ZIP")
5. Extract the downloaded ZIP file to a new folder or to your Desktop.
6. After you've extracted the bot's files, go into the extracted folder, then into structures to find `config.js`.
7. Open that file with your favorite text editor (Notepad++, Visual Studio Code etc) and fill in the required values.
8. `Token` should be set to the token obtained from your app's Discord Developer Portal `Bot` tab. MongoDB should be the URI obtained from your MongoDB Dashboard. For further instructions, watch this [video](https://www.youtube.com/watch?v=z_e6E-okvxs).
`ownerID` should be your own Discord ID, can be obtained by enabling `Developer Mode` in your Discord client and right clicking yourself then `Copy ID`.
`SpotifyClientID` and `SpotifySecret` can be obtained from the [Spotify Developer Portal](https://developer.spotify.com/dashboard/applications), by creating a new app and copying the ID and secret over to the config file.
9. Go back to the main folder and open a `Command Prompt` (or Terminal if you're a Linux or Mac user) inside the folder.
10. Run `npm install` to install the dependencies.
11. After your dependencies finish installing, you can run `node .` and your bot should start up!

If you're having any issues with the installation process, hop in our [Discord Server](https://discord.gg/HwkDSs7X82) for support!
