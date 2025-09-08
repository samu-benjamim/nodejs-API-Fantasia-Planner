import { FilterModel } from "../../models/filter-model";
import { serviceListUser } from "../services-user/list-user";
import { AchievementModel } from "../../models/achievement-model";

export const serviceSeeAchievements = async (id: string | number): Promise<{ statusCode: number; body: AchievementModel[] | { error: string } }> => {
  const usersResponse = await serviceListUser();
  const users = usersResponse.body;

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
    body: user.achievements,
  };
};
