import { module } from "../../../core/types"

const mod: module = [
    {
        checkout: (context, helpers)=>{
            const bd = context.body.data
            if(!bd) return "no body"
        },
        fetch: (context)=>{
            const bd = context.body.data
            return {
                sql: bd.sql,
                value: bd.value,
                next(res) {
                    return eval(bd.next)(res)
                },
                onError(err) {
                    return err.message
                },
            }
        },
        response: (context)=>{
            return {
                "data-provider": {
                    context
                }
            }
        }
    }
]

export default mod