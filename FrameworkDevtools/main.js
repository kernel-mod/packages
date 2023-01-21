const { join } = require("path");
const { session, app } = require("electron");

const devtools = join(__dirname, "react-4.25.0");

app.whenReady().then(() => {
	session.defaultSession.loadExtension(devtools);
});