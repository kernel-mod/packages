const { app } = require("electron");
const devtools = require("electron-devtools-installer");
const fs = require("fs-extra");
const path = require("path");

// const broadcast = require("@kernel/core/broadcast");
// // const { OriginalBrowserWindow } = require("@kernel/core/BrowserWindowPatcher");

module.exports.default = {
	start() {
		console.log("Starting FrameworkDevtools");
		app.on("ready", () => {
			const enabledDevtools = fs.readJSONSync(
				path.join(__dirname, "index.json")
			).options.devtools;
			for (const devtool of enabledDevtools) {
				devtools
					.default(devtools[devtool], {
						loadExtensionOptions: { allowFileAccess: true },
						forceDownload: true,
					})
					.then((name) => console.log(`Added Extension: ${name}`))
					.catch((err) =>
						console.error("Failed to add devtools extensions:", err)
					);
			}
		});
	},
	stop() {
		console.log("Restart the app to unload the devtools.");
	},
};
