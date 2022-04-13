export default {
	start() {
		this.inject();
	},
	inject() {
		setTimeout(() => {
			if (
				window.webpackChunkdiscord_app?.length != null &&
				window.webpackChunkdiscord_app.length >= 40
			) {
				fetch(
					"https://raw.githubusercontent.com/Cumcord/builds/main/build.js"
				)
					.then((response) => response.text())
					.then((code) => eval(code));
			} else {
				this.inject();
			}
		}, 0);
	},
	stop() {
		window.cumcord.uninject();
	},
};
