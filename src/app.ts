import * as http from "http";
import { creatUser, listUser, seeUser, deleteUser, seeQuests, seeAchievements, creatQuest, rankingUser, updateQuest } from "./controller/planner-gamified-controller";
import { HttpMethod } from "./util/http-methods";
import { Route } from "./routes/routes";


export const app = async (request: http.IncomingMessage, response: http.ServerResponse) => {
    

    const baseUrl = request.url?.split("?")[0];

    if (request.method === HttpMethod.GET) {
        if (baseUrl == Route.LIST) {
            await listUser (request, response)
        } else if (baseUrl?.startsWith("/user/") && baseUrl?.endsWith("/quests")) {
            const parts = baseUrl.split("/");
            const id = parts[2];
            await seeQuests (request, response, id)
        } else if (baseUrl?.startsWith("/user/") && baseUrl?.endsWith("/achievements")) {
            const parts = baseUrl.split("/");
            const id = parts[2];
            await seeAchievements (request, response, id)
        } else if (baseUrl?.startsWith(Route.USER)) {
            const id = baseUrl?.split("/")[2]
            await seeUser (request, response, id)
        } else if (baseUrl == Route.RANKING) {
            await rankingUser(request, response);
        }
    }

    if (request.method === HttpMethod.POST) {
        if (baseUrl == Route.CREATE) {
            await creatUser (request, response)
        } else if (baseUrl?.startsWith("/user/") && baseUrl?.endsWith("/quests")) {
            const parts = baseUrl.split("/");
            const id = parts[2];
            await creatQuest (request, response, parseInt(id))
        } 
    }

    if (request.method === HttpMethod.PATCH) {
        if (baseUrl == Route.USER) {
            null
        } else if (baseUrl?.startsWith("/user/") && baseUrl.includes("/quests/")) {
            const parts = baseUrl.split("/");
            const userId = parseInt(parts[2]);
            const questId = parts[4];
            await updateQuest(request, response, userId, questId);
        } else if (baseUrl == Route.ADDXP) {
            null
        }
    }

    if (request.method === HttpMethod.DELETE) {
        if (baseUrl?.startsWith(Route.USER)) {
            const id = baseUrl?.split("/")[2]
            await deleteUser (request, response, id)
        } else if (baseUrl == Route.QUESTID) {
            null
        }
    }

}