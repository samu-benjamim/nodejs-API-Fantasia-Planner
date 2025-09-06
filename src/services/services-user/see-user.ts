import { FilterModel } from "../../models/filter-model"
import { serviceListUser } from "./list-user"


export const serviceSeeUser = async (id:any) => { 
    let responseFormat = {
        statusCode: 0,
        body: {},
    }

    const users = await serviceListUser()
    
    const body = users.body

    const rawId = parseInt(id) - 1 
    
    const bodyId = body[rawId]



    responseFormat.statusCode = 200;
    responseFormat.body = bodyId

    return responseFormat
}
