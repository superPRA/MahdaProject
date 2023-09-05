import { module } from "../../../../core/types";

const mod: module = [
    {
        checkout: (context) => {
            const bd = context.body.data;
            if (!bd || !bd._id || !bd._category_id || !bd.name || !bd.info || !bd.meta || !bd.amount || !bd.imgs) return "no body"
            return true;
        },
        dbset: (context,helpers) => {
            const bd = context.body.data;
            return {
                sql: `UPDATE products SET _category_id=$2, name=$3, info=$4, meta=$5, amount=$6, imgs=$7, _by='dev'  WHERE _id = $1`,
                value: [bd._id, bd._category_id,bd.name, bd.info, bd.meta, bd.amount, bd.imgs, ],
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

export default mod;
