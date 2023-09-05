import { module } from "../../../../core/types";

const mod: module = [
    {
        checkout: (context) => {
            const bd = context.body.data;
            if (!bd || !bd.name || !bd.info || !bd.meta || !bd.imgs) return "no body";
            return true;
        },
        dbset: (context,helpers) => {
            const bd = context.body.data;
            return {
                sql: `INSERT INTO category(_id,name,info,meta,imgs,_by) VALUES($1,$2,$3,$4,$5,$6)`,
                value: ["CG"+helpers.getRandomContinusId(), bd.name, bd.info, bd.meta, bd.imgs, 'dev'],
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
