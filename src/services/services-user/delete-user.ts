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


    
    const users = await serviceListUser()
    const userId = await serviceSeeUser(id)
    const body = users.body
    const bodyId = users.body

    body = body.filter((user: any) => user.id !== id);

    writeUser(body)


    responseFormat.statusCode = 200;
    responseFormat.body = body

    return responseFormat


}
