import { Request, Response } from "express";
import DiskCache from "../utils/diskCache";

export async function getItem(req: Request, res: Response): Promise<Response> {
    const key = req.query.key as string;
    if (!key) {
        return res.status(400).send("Missing key");
    }

    const value = await DiskCache.get(key);
    if (value) {
        return res.status(200).header({
            "Content-Type": "application/json"
        }).send(value);
    } else {
        return res.status(404).send("Not found");
    }
}