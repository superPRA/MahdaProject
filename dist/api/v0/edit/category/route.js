"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mod = [
    {
        checkout: (context) => {
            const bd = context.body.data;
            if (!bd || !bd._id || !bd.name || !bd.info || !bd.meta || !bd.imgs)
                return "no body";
            return true;
        },
        dbset: (context, helpers) => {
            const bd = context.body.data;
            return {
                sql: `UPDATE category SET name = $2, info = $3, meta = $4, imgs = $5 WHERE _id = $1`,
                value: [bd._id, bd.name, bd.info, bd.meta, bd.imgs],
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
                "data-provider": {},
            };
        },
    },
];
exports.default = mod;
