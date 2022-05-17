import { config } from "./config";
import { createServer } from "./app";
import { Logger } from "./utils/logger";

function init() {
    process.on("unhandledRejection", (error: any) => {
        // eslint-disable-next-line no-console
        console.dir(error?.stack);
        process.exit(1);
    });

    createServer(() => {
        Logger.info(`Server started on port ${config.port}.`);
    }).setTimeout(15000);
}

init();
