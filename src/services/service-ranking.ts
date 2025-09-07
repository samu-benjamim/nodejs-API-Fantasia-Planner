import { serviceListUser } from "./services-user/list-user"


export const serviceRankingUser = async () => { 
    let responseFormat = {
        statusCode: 0,
        body: {},
    }

    const users = await serviceListUser()
    
    const body = users.body
    
    const ranking = body.sort((a:any, b:any) => b.xp - a.xp).map((user: any) => ({
                name: user.name,
                level: user.level,
                xp: user.xp
            }));


    responseFormat.statusCode = 200;
    responseFormat.body = ranking
    return responseFormat
}
