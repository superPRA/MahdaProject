import { module } from "../../../../core/types";

const mod: module = [
    {
        checkout: (context) => {
            const bd = context.body.data;
            if (!bd || !bd._id) return "no body";
            return true;
        },
        dbset: (context,helpers) => {
            const bd = context.body.data;
            return {
                sql: "DELETE FROM category WHERE _id = $1",
                value: [bd._id],
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
