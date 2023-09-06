import { Request, Response } from "express";
import { context, modReturn, poolResponse } from "./types";
import { getRandomContinusId } from "./helper";
import pool from "../utils/connctDb";

export default async function apisCore(req: Request, res: Response) {
    const context: context = {
        body: {...req.body},
        action: {},
    };
    const helpers = {
        getRandomContinusId,
    };
    let mods = [];
    if (!context.body.formId)
        return res.json({
            error: "formId is not included",
        });
    if (typeof context.body.formId === "string") {
        context.body.formId = [context.body.formId];
    }
    for (let i = 0; i < context.body.formId.length; i++) {
        try {
            mods.push(
                await import(`../api/v0/${context.body.formId[i]}/route`).then(
                    (q) => q.default
                )
            );
        } catch (err) {
            return res.json({
                error: err,
                a: `../api/v0/${context.body.formId[i]}/route`,
            });
        }
    }
    if (!mods.every((mod) => mod)) {
        return res.json({
            done: false,
            error: "module does not exist",
        });
    }
    const response: response = [];
    for (let m = 0; m < mods.length; m++) {
        const mod = mods[m]
        context.body.formId = req.body.formId[m]
        context.body.data = req.body.data[m]
        list: for (let i = 0; i < mod.length; i++) {
            context.action = {}
            for (let j = 0; j < Object.keys(mod[i]).length; j++) {
                const key = Object.keys(mod[i])[j];
                const value = mod[i][key](context, helpers);
                if (typeof value === "string") {
                    response.push({
                        done: false,
                        error: "",
                        message: value,
                    });
                    continue list
                } else if (value === false) {
                    continue list;
                } else if (value === true) {
                    context.action[key] = value;
                    continue;
                } else if (
                    typeof value === "object" &&
                    "data-provider" in value
                ) {
                    response.push({
                        done: true,
                        ...value,
                    });
                    continue list
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
                            response.push({
                                done: false,
                                error: "",
                                message: value.onError(err),
                            });
                            continue list
                        }
                        response.push({ err });
                        continue list
                    }
                } else if (typeof value === "object" && "error" in value) {
                    response.push({
                        done: false,
                        ...value,
                    });
                    continue list
                }
            }
        }
    }
    return res.json(response);
}

export type response = (
    | {
          done: false;
          error: string;
          message: string;
      }
    | { err: unknown }
)[];
