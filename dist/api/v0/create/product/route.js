"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mod = [
    {
        checkout: (context) => {
            const bd = context.body.data;
            if (!bd ||
                !bd._category_id ||
                !bd.name ||
                !bd.info ||
                !bd.meta ||
                !bd.amount ||
                !bd.imgs)
                return "no body";
            return true;
        },
        dbset: (context, helpers) => {
            const bd = context.body.data;
            return {
                sql: `INSERT INTO products(_id,_category_id,name,info,meta,amount,imgs,_by) VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,
                value: [
                    "PR" + helpers.getRandomContinusId(),
                    bd._category_id,
                    bd.name,
                    bd.info,
                    bd.meta,
                    bd.amount,
                    bd.imgs,
                    "dev",
                ],
                next(res) {
                    return res;
                },
                onError(err) {
                    return err.message;
                },
            };
        },
        response: (context) => {
            return {
                done: !!context.action.dbset.rowCount,
                "data-provider": {
                    a: context.action.dbset || "asd"
                }
            };
        },
    },
];
exports.default = mod;
