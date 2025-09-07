import fs from "fs";
import { pathUser } from "../../repositories/planner-gamified-repositories";
import { serviceListUser } from "../services-user/list-user";
import { UserModel } from "../../models/user-model";
import { QuestModel } from "../../models/quest-model";

const writeUser = (data: any) => {
    fs.writeFileSync(pathUser, JSON.stringify(data, null, 2), "utf-8");
};

export const serviceUpadateQuest = async (userId: number, questId: string) => {
    let responseFormat = {
        statusCode: 0,
        body: {},
    };

    try {
        const users = await serviceListUser();
        const body = users.body as UserModel[];

        const userIndex = body.findIndex((u: UserModel) => u.id === userId);
        if (userIndex === -1) {
            responseFormat.statusCode = 404;
            responseFormat.body = { message: "Usuário não encontrado" };
            return responseFormat;
        }

        const user = body[userIndex];

        const questIndex = user.quests.findIndex((q: QuestModel) => q.id == parseInt(questId));
        if (questIndex === -1) {
            responseFormat.statusCode = 404;
            responseFormat.body = { message: "Missão não encontrada" };
            return responseFormat;
        }

        const quest = user.quests[questIndex];

        // Atualiza o status da missão
        quest.status = "completed";

        // Quando concluir a missão, adiciona conquista e remove a quest da lista
        user.achievements.push({
            id: quest.id,
            title: quest.title,
            description: `Concluiu a missão: ${quest.title}`,
            unlocked_at: new Date().toISOString(),
        });

        user.quests.splice(questIndex, 1);

        body[userIndex] = user;

        // Salva no arquivo JSON
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
