import { module } from "../../../../core/types"

const mod: module = [
    {
        checkout: (context, helpers)=>{
            const bd = context.body.data
            if(!bd) return "no body 1"
        },
        fetch: (context)=>{
            const bd = context.body.data
            return {
                sql: "SELECT * FROM products",
                value: [],
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