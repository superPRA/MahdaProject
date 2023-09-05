import { module } from "../../../../../core/types"

const mod: module = [
    {
        checkout: (context, helpers)=>{
            const bd = context.body.data
            if(!bd) return "no body"
        },
        fetch_ids: (context)=>{
            const bd = context.body.data
            return {
                sql: "SELECT meta FROM app_profile WHERE _id=$1",
                value: ["APlm6gnpoa8rfone"],
                next(res) {
                    return res.rows[0].meta.altCG
                },
            }
        },
        fetch_category: (context)=>{
            return {
                sql: `SELECT * FROM category WHERE _id IN ('${context.action.fetch_ids.join("','")}')`,
                value:[],
                next(res) {
                    return res.rows
                },
            }
        },
        response: (context)=>{
            return {
                "data-provider": {
                    altCategories: context.action.fetch_category
                }
            }
        }
    }
]

export default mod