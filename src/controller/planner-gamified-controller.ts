import { IncomingMessage, ServerResponse } from "http";
import { serviceListUser } from "../services/services-user/list-user";
import { ContentType } from "../util/content-type";
import { serviceCreatUser } from "../services/services-user/creat-user";
import { serviceSeeUser } from "../services/services-user/see-user";
import { serviceDeteleUser } from "../services/services-user/delete-user";



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