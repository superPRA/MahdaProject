import { module } from "../../../../../core/types"

const mod: module = [
    {
        checkout: (context, helpers)=>{
            const bd = context.body.data
            if(!bd || !bd.sale || !bd.sale.start.toString() || !bd.sale.end.toString()) return "no body"
        },
        fetch: (context)=>{
            const bd = context.body.data
            return {
                sql: "SELECT * FROM products WHERE sale <= $1 AND sale >= $2",
                value: [bd.sale.end, bd.sale.start],
                next(res) {
                    return res.rows
                },
            }
        },
        response: (context)=>{
            return {
                "data-provider": {
                    products: context.action.fetch
                }
            }
        }
    }
]

export default mod