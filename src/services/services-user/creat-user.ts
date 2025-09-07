import fs from "fs"
import { pathUser } from "../../repositories/planner-gamified-repositories"
import { serviceListUser } from "./list-user";
import { UserModel } from "../../models/user-model";
import { FilterModel } from "../../models/filter-model";

const writeUser = (data: any) => {
    fs.writeFileSync(pathUser, JSON.stringify(data, null, 2), "utf-8");
}



export const serviceCreatUser = async () => { 
    let responseFormat: FilterModel = {
        statusCode: 0,
        body: [],
    }

    const users = await serviceListUser()
    

    const body = users.body
    const num :number = body.length + 1

    const newUser:UserModel  = {
    "id": 1,
    "name": "Ingrid",
    "email": "ingrid@email.com",
    "passwordHash": "987456123",
    "level": 1,
    "xp": 0,
    "quests": [],
    "achievements": [],
    "createdAt": "2025-09-04T18:00:00Z",
    "updatedAt": "2025-09-04T19:30:00Z"
    }


    body.push(newUser);

    writeUser(body)


    responseFormat.statusCode = 200;
    responseFormat.body = body

    return responseFormat


}
