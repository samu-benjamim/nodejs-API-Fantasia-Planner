import { QuestModel } from "../../models/quest-model";
import { ResponseModel } from "../../models/response-model";
import { serviceListUser } from "../services-user/list-user";
import { UserModel } from "../../models/user-model";

export const serviceSeeQuests = async (
  id: string | number
): Promise<ResponseModel<QuestModel[] | { error: string }>> => {
  try {
    const usersResponse = await serviceListUser();
    const users = usersResponse.body as UserModel[];

    const userId = typeof id === "string" ? parseInt(id) : id;
    const user = users.find(u => u.id === userId);

    if (!user) {
      return {
        statusCode: 404,
        body: { error: "Usuário não encontrado" },
      };
    }

    return {
      statusCode: 200,
      body: user.quests,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: { error: "Erro ao buscar quests" },
    };
  }
};
