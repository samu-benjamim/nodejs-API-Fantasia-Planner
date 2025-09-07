import fs from "fs"
import { pathUser } from "../../repositories/planner-gamified-repositories"
import { serviceListUser } from "../services-user/list-user";
import { FilterModel } from "../../models/filter-model";
import { QuestModel } from "../../models/quest-model";
import { serviceSeeQuests } from "../services-quest/see-quest";

const writeUser = (data: any) => {
    fs.writeFileSync(pathUser, JSON.stringify(data, null, 2), "utf-8");
}

export const serviceAddAchievements = async (UserId:number) => { 
    let responseFormat: FilterModel = {
        statusCode: 0,
        body: [],
    }

    const users = await serviceListUser()
    const userList = users.body
    const user = userList.find(u => u.id === UserId);
    if (!user) {
        responseFormat.statusCode = 404;
        return responseFormat;
    }

    const servQuests = await serviceSeeQuests(UserId)

    const quests = servQuests.body


    const newQuest:QuestModel  = {
        "id": quests.length + 1,
        "title": "Elaborar projeto pessoal",
        "description": "Elaboração de uma API para Planner Gamified",
        "status": "Em andamento",
        "xpReward": 100,
        "deadline": "2025-09-04T19:00:00Z",
    }
    
    const body = users.body
    
    quests.push(newQuest);

    user.quests= quests

    writeUser(userList)


    responseFormat.statusCode = 200;
    responseFormat.body = userList
    
    return responseFormat


}
