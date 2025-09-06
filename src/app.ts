import * as http from "http";
import { creatUser, listUser, seeUser, deleteUser } from "./controller/planner-gamified-controller";
import { HttpMethod } from "./util/http-methods";
import { Route } from "./routes/routes";


export const app = async (request: http.IncomingMessage, response: http.ServerResponse) => {
    

    const baseUrl = request.url?.split("?")[0];


    

    if (request.method === HttpMethod.GET) {
        if (baseUrl == Route.LIST) {
            await listUser (request, response)
        }
        if (baseUrl?.startsWith(Route.USER)) {
            const id = baseUrl?.split("/")[2]
            await seeUser (request, response, id)
        }
        if (baseUrl == Route.QUEST) {
            null
        }
        if (baseUrl == Route.ACHIEVEMENTS) {
            null
        }
        if (baseUrl == Route.RANKING) {
            null
        }

    }

    if (request.method === HttpMethod.POST) {
        if (baseUrl == Route.CREATE) {
            await creatUser (request, response)
        }
        if (baseUrl == Route.QUEST) {
            null
        }
        if (baseUrl == Route.ACHIEVEMENTS) {
            null
        }

    }

    if (request.method === HttpMethod.PATCH) {
        if (baseUrl == Route.USER) {
            null
        }
        if (baseUrl == Route.QUESTID) {
            null
        }
        if (baseUrl == Route.ADDXP) {
            null
        }
    }

    if (request.method === HttpMethod.DELETE) {
        if (baseUrl?.startsWith(Route.USER)) {
            const id = baseUrl?.split("/")[2]
            await deleteUser (request, response, id)
        }
        if (baseUrl == Route.QUESTID) {
            null
        }
    }

}