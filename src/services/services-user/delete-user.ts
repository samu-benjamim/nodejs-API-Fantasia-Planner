import fs from "fs"
import { pathUser } from "../../repositories/planner-gamified-repositories"
import { serviceListUser } from "./list-user";
import { UserModel } from "../../models/user-model";
import { FilterModel } from "../../models/filter-model";
import { serviceSeeUser } from "../../services/services-user/see-user";

const writeUser = (data: any) => {
    fs.writeFileSync(pathUser, JSON.stringify(data, null, 2), "utf-8");
}



export const serviceDeteleUser = async (id:any) => { 
    let responseFormat: FilterModel = {
        statusCode: 0,
        body: [],
    }

    const rawId = id -1
    
    const users = await serviceListUser()
    const body = users.body

   body.splice(rawId, 1)

    writeUser(body)


    responseFormat.statusCode = 200;
    responseFormat.body = body

    return responseFormat


}
