import fs from "fs";
import { pathUser } from "../../repositories/planner-gamified-repositories";
import { serviceListUser } from "../services-user/list-user";
import { UserModel } from "../../models/user-model";

const writeUser = (data: any) => {
    fs.writeFileSync(pathUser, JSON.stringify(data, null, 2), "utf-8");
};

export const serviceUpadateUser = async (userId: number) => {
    let responseFormat = {
        statusCode: 0,
        body: {},
    };

    try {
        const users = await serviceListUser();
        const body = users.body as UserModel[];

        const userIndex = body.findIndex((u: UserModel) => u.id === userId);
       
        let user = body[userIndex];

        const update = {
            "id": 2,
            "name": "Ingrid Oliveira",
            "email": "ingrid@email.com",
            "passwordHash": "888555",
            "level": 3,
            "xp": 0,
            "quests": [],
            "achievements": [],
            "createdAt": "2025-09-04T18:00:00Z",
            "updatedAt": "2025-09-04T19:30:00Z"
        }
            
        

        user = update;

        body[userIndex] = user;

        writeUser(body);

        responseFormat.statusCode = 200;
        responseFormat.body = {
            message: "Você atualizou os dados",
            user,
        };

        return responseFormat;
    } catch (error) {
        responseFormat.statusCode = 500;
        responseFormat.body = { message: "Erro ao atualizar missão" };
        return responseFormat;
    }
};
