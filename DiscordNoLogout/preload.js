const gsetw = require("gsetw");

module.exports = {
	start() {
		gsetw(global, "DiscordNative").then(() => {
			console.log("DiscordNoLogout: DiscordNative loaded");
			DiscordNative.window.setDevtoolsCallbacks(
				() => {},
				() => {}
			);
		});
	},
};
