import fs from "fs/promises";
import { pathUser } from "../../repositories/planner-gamified-repositories";
import { serviceListUser } from "../services-user/list-user";
import { UserModel } from "../../models/user-model";
import { QuestModel } from "../../models/quest-model";
import { ResponseModel } from "../../models/response-model";

const writeUser = async (data: UserModel[]) => {
  await fs.writeFile(pathUser, JSON.stringify(data, null, 2), "utf-8");
};

export const serviceUpdateQuest = async (
  userId: number,
  questId: number,
  data: Partial<QuestModel>
): Promise<ResponseModel<{ message: string; user?: UserModel }>> => {
  try {
    const usersResponse = await serviceListUser();
    const users = usersResponse.body as UserModel[];

    const user = users.find(u => u.id === userId);
    if (!user) {
      return { statusCode: 404, body: { message: "Usuário não encontrado" } };
    }

    const questIndex = user.quests.findIndex(q => q.id === questId);
    if (questIndex === -1) {
      return { statusCode: 404, body: { message: "Missão não encontrada" } };
    }

    const quest = user.quests[questIndex];

    // Atualiza XP e status da missão
    user.xp += quest.xpReward;
    quest.status = "completed";

    // Adiciona achievement
    user.achievements.push({
      id: quest.id,
      title: quest.title,
      description: `Concluiu a missão: ${quest.title}`,
      unlockedAt: new Date(),
    });

    // Remove a quest da lista
    user.quests.splice(questIndex, 1);

    await writeUser(users);

    return {
      statusCode: 200,
      body: { message: "Missão concluída com sucesso!", user },
    };
  } catch (error) {
    return { statusCode: 500, body: { message: "Erro ao atualizar missão" } };
  }
};
