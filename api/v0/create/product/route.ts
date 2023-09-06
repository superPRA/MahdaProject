import { module } from "../../../../core/types";

const mod: module = [
    {
        checkout: (context) => {
            const bd = context.body.data;
            if (
                !bd ||
                !bd._category_id ||
                !bd.name ||
                !bd.info ||
                !bd.meta ||
                !bd.amount ||
                !bd.imgs || 
                !bd.sale.toString()
            )
                return "no body " + JSON.stringify(bd);
            return true;
        },
        dbset: (context, helpers) => {
            const bd = context.body.data;
            return {
                sql: `INSERT INTO products(_id,_category_id,name,info,meta,amount,imgs,_by,sale) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
                value: [
                    "PR" + helpers.getRandomContinusId(),
                    bd._category_id,
                    bd.name,
                    bd.info,
                    bd.meta,
                    bd.amount,
                    bd.imgs,
                    "dev",
                    bd.sale
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

export default mod;
