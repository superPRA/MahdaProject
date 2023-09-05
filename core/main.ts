import { Request, Response } from "express";
import pool from "../utils/connctDb";
import { context, poolResponse } from "./types";
import { getRandomContinusId } from "./helper";

export default async function core(req: Request, res: Response) {
    const context: context = {
        body: req.body,
        action: {},
    };
    const helpers = {
        getRandomContinusId
    };
    let mod = null;
    if (!context.body.formId)
        return res.json({
            error: "formId is not included",
        });
    try {
        mod = await import(`../api/v0/${context.body.formId}/route`).then(
            (q) => q.default
        );
    } catch (err) {
        return res.json({
            error: err,
            a: `../api/v0/${context.body.formId}/route`
        });
    }
    if (typeof mod === "undefined") {
        return res.json({
            done: false,
            error: "module does not exist",
        });
    }

    list: for (let i = 0; i < mod.length; i++) {
        for (let j = 0; j < Object.keys(mod[i]).length; j++) {
            const key = Object.keys(mod[i])[j];
            const value = mod[i][key](context, helpers);
            if (typeof value === "string") {
                return res.json({
                    done: false,
                    error: "",
                    message: value,
                });
            } else if (value === false) {
                continue list;
            } else if (value === true) {
                context.action[key] = value;
                continue;
            } else if (typeof value === "object" && "data-provider" in value) {
                return res.json({
                    done: true,
                    ...value,
                });
            } else if (typeof value === "object" && "sql" in value) {
                try {
                    const res = await pool
                        .query(value.sql, value.value || [])
                        .then((response: poolResponse) => {
                            if (typeof value.next === "function") {
                                return value.next(response);
                            }
                            return response;
                        });

                    context.action[key] = res;
                } catch (err) {
                    if (typeof value.onError === "function") {
                        return res.json({
                            done: false,
                            message: value.onError(err),
                        });
                    }
                    return res.json(err);
                }
            } else if (typeof value === "object" && "error" in value) {
                return res.json({
                    done: false,
                    ...value,
                });
            }
        }

        return res.send("hi");
    }
}
