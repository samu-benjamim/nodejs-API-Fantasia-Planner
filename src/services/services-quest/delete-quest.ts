import fs from "fs";
import { pathUser } from "../../repositories/planner-gamified-repositories";
import { serviceListUser } from "../services-user/list-user";
import { UserModel } from "../../models/user-model";
import { QuestModel } from "../../models/quest-model";

const writeUser = (data: any) => {
    fs.writeFileSync(pathUser, JSON.stringify(data, null, 2), "utf-8");
};

export const serviceDeleteQuest = async (userId: number, questId: number) => {
    let responseFormat = {
        statusCode: 0,
        body: {},
    };

    try {
        const users = await serviceListUser();
        const body = users.body as UserModel[];

        const userIndex = body.findIndex((u: UserModel) => u.id === userId);
       
        const user = body[userIndex];

        const questIndex = user.quests.findIndex((q: QuestModel) => q.id == (questId));
        
        user.quests.splice(questIndex, 1);

        body[userIndex] = user;

        writeUser(body);

        responseFormat.statusCode = 200;
        responseFormat.body = {
            message: "Missão concluída com sucesso!",
            user,
        };

        return responseFormat;
    } catch (error) {
        responseFormat.statusCode = 500;
        responseFormat.body = { message: "Erro ao atualizar missão" };
        return responseFormat;
    }
};
