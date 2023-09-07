import { module } from "../../../../../core/types";

const mod: module = [
    {
        checkout: (context, helpers) => {
            const bd = context.body.data;
            if (!bd || !bd.limit || !bd.page || !bd.category) return "no body";
        },
        counts: (context) => {
            const bd = context.body.data;
            return {
                sql: "SELECT COUNT(*) FROM products WHERE _category_id = $1",
                value: [bd.category],
                next(res) {
                    return res.rows[0].count;
                },
                onError(err) {
                    return err.message;
                },
            };
        },
        products: (context) => {
            const bd = context.body.data;
            return {
                sql: "SELECT * FROM products WHERE _category_id = $1 OFFSET $2 LIMIT $3",
                value: [bd.category ,bd.limit * (bd.page - 1), bd.limit],
                next(res) {
                    return res.rows;
                },
                onError(err) {
                    return err.message;
                },
            };
        },
        response: (context) => {
            return {
                "data-provider": {
                    count: context.action.counts,
                    products: context.action.products,
                },
            };
        },
    },
];

export default mod;
