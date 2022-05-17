import express, { Router } from "express";
import { config } from "./config";
import ExpressPromiseRouter from "express-promise-router";
import { Server } from "http";
import { loggerMiddleware } from "./middleware/logger";
import { getItem } from "./routes/getItem";
import { setItem } from "./routes/setItem";

export function createServer(callback: () => void): Server {
    // Create a service (the app object is just a callback).
    const app = express();

    const router = ExpressPromiseRouter();
    app.use(router);

    router.use(loggerMiddleware);
    router.use(express.json());

    // Setup pretty JSON
    if (config.mode === "development") app.set("json spaces", 2);

    // Set production mode
    app.set("env", config.mode || "production");

    setupRoutes(router);

    return app.listen(config.port, callback);
}

function setupRoutes(router: Router) {
    router.get("/api/v1/item", getItem);

    router.post("/api/v1/item", setItem);
}
