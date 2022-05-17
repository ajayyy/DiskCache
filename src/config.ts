import fs from "fs";
import { SBSConfig } from "./types/config.model";
import { isNumber } from "lodash";

export const config: SBSConfig = JSON.parse(fs.readFileSync("config.json").toString("utf8"));

addDefaults(config, {
    port: 8080,
    diskCache: {
        max: 10737418240
    }
});
loadFromEnv(config);

// Add defaults
function addDefaults(config: SBSConfig, defaults: SBSConfig) {
    for (const key in defaults) {
        if (!Object.prototype.hasOwnProperty.call(config, key)) {
            config[key] = defaults[key];
        }
    }
}

function loadFromEnv(config: SBSConfig, prefix = "") {
    for (const key in config) {
        const fullKey = (prefix ? `${prefix}_` : "") + key;
        const data = config[key];

        if (typeof data === "object" && !Array.isArray(data)) {
            loadFromEnv(data, fullKey);
        } else if (process.env[fullKey]) {
            const value = process.env[fullKey];
            if (isNumber(value)) {
                config[key] = parseInt(value, 10);
            } else if (value.toLowerCase() === "true" || value.toLowerCase() === "false") {
                config[key] = value === "true";
            } else {
                config[key] = value;
            }
        }
    }
}