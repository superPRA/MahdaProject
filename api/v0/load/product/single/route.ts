import { module } from "../../../../../core/types"

const mod: module = [
    {
        checkout: (context, helpers)=>{
            const bd = context.body.data
            if(!bd || !bd.id) return "no body"
        },
        product: (context)=>{
            const bd = context.body.data
            return {
                sql: "SELECT * FROM products WHERE _id = $1",
                value: [bd.id],
                next(res) {
                    return res.rows[0]
                },
            }
        },
        response: (context)=>{
            return {
                "data-provider": {
                    products: context.action.product
                }
            }
        }
    }
]

export default mod