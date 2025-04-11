import { Request, Response } from "express";
import DiskCache from "../utils/diskCache";
import { Logger } from "../utils/logger";

export async function getItem(req: Request, res: Response): Promise<Response> {
    const key = req.query.key as string;
    if (!key) {
        return res.status(400).send("Missing key");
    }

    const value = await DiskCache.get(key);
    if (value) {
        try {
            return res.status(200).send(JSON.parse(value as string));
        } catch (e) {
            Logger.error(`Error parsing JSON: ${e}`);
            return res.status(500).send("Error parsing JSON");
        }
    } else {
        return res.status(404).send("Not found");
    }
}