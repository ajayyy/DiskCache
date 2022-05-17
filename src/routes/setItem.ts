import { Request, Response } from "express";
import DiskCache from "../utils/diskCache";
import { Logger } from "../utils/logger";

export async function setItem(req: Request, res: Response): Promise<Response> {
    const key = req.body.key as string;
    const value = req.body.value as string;
    if (!key || !value) {
        return res.status(400).send("Missing key or value");
    }

    try {
        await DiskCache.set(key, JSON.stringify(value));
        return res.status(200).send("OK");
    } catch (e) {
        Logger.error(e as string);
        return res.status(500).send("Failed to save");
    }
}