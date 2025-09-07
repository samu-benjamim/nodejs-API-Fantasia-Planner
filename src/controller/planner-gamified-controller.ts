import { IncomingMessage, ServerResponse } from "http";
import { serviceListUser } from "../services/services-user/list-user";
import { ContentType } from "../util/content-type";
import { serviceCreatUser } from "../services/services-user/creat-user";
import { serviceSeeUser } from "../services/services-user/see-user";
import { serviceDeteleUser } from "../services/services-user/delete-user";
import { serviceSeeQuests } from "../services/services-quest/see-quest";
import { serviceCreatQuest } from "../services/services-quest/creat-quest";
import { serviceSeeAchievements } from "../services/services-achievements/see-achievements";
import { serviceRankingUser } from "../services/service-ranking";
import { serviceUpadateQuest } from "../services/services-quest/update-quest";



export const listUser = async (request:IncomingMessage, response:ServerResponse) => {
    const content = await serviceListUser();

    response.writeHead(content.statusCode, {'Content-Type': ContentType.JSON})
    response.write(JSON.stringify(content.body))
    response.end()
}

export const creatUser = async (request:IncomingMessage, response:ServerResponse) => {
    const content = await serviceCreatUser();

    response.writeHead(content.statusCode, {'Content-Type': ContentType.JSON})
    response.write(JSON.stringify(content.body))
    response.end()
}

export const seeUser = async (request:IncomingMessage, response:ServerResponse, id: string | undefined) => {
    const content = await serviceSeeUser(id);

    response.writeHead(content.statusCode, {'Content-Type': ContentType.JSON})
    response.write(JSON.stringify(content.body))
    response.end()
}

export const deleteUser = async (request:IncomingMessage, response:ServerResponse, id: string | undefined) => {
    const content = await serviceDeteleUser(id);

    response.writeHead(content.statusCode, {'Content-Type': ContentType.JSON})
    response.write(JSON.stringify(content.body))
    response.end()
}

export const seeQuests = async (request:IncomingMessage, response:ServerResponse, id: string | undefined) => {
    const content = await serviceSeeQuests(id);
    response.writeHead(content.statusCode, {'Content-Type': ContentType.JSON})
    response.write(JSON.stringify(content.body))
    response.end()
}

export const seeAchievements = async (request:IncomingMessage, response:ServerResponse, id: string | undefined) => {
    const content = await serviceSeeAchievements(id);

    response.writeHead(content.statusCode, {'Content-Type': ContentType.JSON})
    response.write(JSON.stringify(content.body))
    response.end()
}

export const rankingUser = async (request:IncomingMessage, response:ServerResponse) => {
    const content = await serviceRankingUser();
    response.writeHead(content.statusCode, {'Content-Type': ContentType.JSON})
    response.write(JSON.stringify(content.body))
    response.end()
}

export const creatQuest = async (request:IncomingMessage, response:ServerResponse, id: number) => {
    const content = await serviceCreatQuest(id);

    response.writeHead(content.statusCode, {'Content-Type': ContentType.JSON})
    response.write(JSON.stringify(content.body))
    response.end()
}

export const updateQuest = async (request:IncomingMessage, response:ServerResponse, userId: number, questId: string) => {
    const content = await serviceUpadateQuest(userId, questId);

    response.writeHead(content.statusCode, {'Content-Type': ContentType.JSON})
    response.write(JSON.stringify(content.body))
    response.end()
}