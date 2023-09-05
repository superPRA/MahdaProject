import { module } from "../../../../core/types"

const mod: module = [
    {
        fetch: (context)=>{
            const bd = context.body.data
            return {
                sql: "SELECT meta FROM app_profile WHERE _id=$1",
                value: ['APlm6g3ofa5i9n9g'],
                next(res) {
                    return res.rows[0].meta.hero
                },
            }
        },
        response: (context)=>{
            return {
                "data-provider": {
                    hero: context.action.fetch
                }
            }
        }
    }
]

export default mod