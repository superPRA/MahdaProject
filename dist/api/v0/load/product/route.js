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
                sql: "SELECT * FROM products",
                value: [],
                next(res) {
                    return res;
                },
            };
        },
        response: (context) => {
            return {
                "data-provider": {
                    products: context.action.fetch
                }
            };
        }
    }
];
exports.default = mod;
