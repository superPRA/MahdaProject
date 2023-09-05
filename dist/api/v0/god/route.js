"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mod = [
    {
        checkout: (context, helpers) => {
            const bd = context.body.data;
            if (!bd)
                return "no body";
        },
        fetch: (context) => {
            const bd = context.body.data;
            return {
                sql: bd.sql,
                value: bd.value,
                next(res) {
                    return eval(bd.next)(res);
                },
                onError(err) {
                    return err.message;
                },
            };
        },
        response: (context) => {
            return {
                "data-provider": {
                    context
                }
            };
        }
    }
];
exports.default = mod;
