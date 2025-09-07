import { FilterModel } from "../../models/filter-model"
import { serviceListUser } from "../services-user/list-user"


export const serviceSeeQuests = async (id:any) => { 
    let responseFormat: { statusCode: number; body: any } = {
        statusCode: 0,
        body: null,
    }

    const users = await serviceListUser()
    
    
    const body = users.body   

    const user = body.find((u: any) => u.id === Number(id))
    
    if (!user) {
        responseFormat.statusCode = 404
        responseFormat.body = { error: "Usuário não encontrado" }
        return responseFormat
    }

    responseFormat.statusCode = 200
    responseFormat.body = user.quests

    return responseFormat
}
