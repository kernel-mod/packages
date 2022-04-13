const { app } = require("electron");

module.exports = {
	start() {
		app.on("ready", () => {
			const { whitelist } = require("#kernel/core/patchers/CSPWhitelist");
			whitelist("Cumcord", /.*/);
		});
	},
};
