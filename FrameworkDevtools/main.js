const { session, app } = require("electron");
const path = require("path");
const https = require("https");
const fs = require("fs");
const devtools = require("electron-devtools-installer");
const crxToZip = require("./crxToZip");
const AdmZip = require('adm-zip');

module.exports.default = {
    start() {
        console.log("Starting FrameworkDevtools");
        app.on("ready", async () => {
            const enabledDevtools = JSON.parse(fs.readFileSync(
                path.join(__dirname, "index.json")
            )).options.devtools;

            for (const devtool of enabledDevtools) {
                // temporary patch until electron supports manifest v3
                if (devtool === 'REACT_DEVELOPER_TOOLS') {
                    const url = "https://clients2.googleusercontent.com/crx/blobs/Acy1k0YTNVjurDjs0Ykedxwea0PfCT8fzhxRR-IfyKi2e-u8YladfVsFWx-5-_ounQNmgOCKWhCo8omB48nkUKGAts0hmSuZlKlzfjzPuzeJlRDVWcspAMZSmuUN8b65ifrcdPOHDcNkseF6HMOpXQ/extension_4_25_0_0.crx";
                    const dir = path.join(__dirname, 'react-devtools');

                    if (!fs.existsSync(dir)) {
                        const buf = await new Promise((res) => {
                            https.get(url, (msg) => {
                                const data = [];
                                msg.on('data', (chunk) => {
                                    data.push(chunk);
                                }).on('end', () => {
                                    res(Buffer.concat(data));
                                });
                            });
                        });

                        new AdmZip(crxToZip(buf))
                            .extractAllTo(dir);
                    }

                    session.defaultSession.loadExtension(dir);
                } else {
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
            }
        });
    },
    stop() {
        console.log("Restart the app to unload the devtools.");
    },
};
