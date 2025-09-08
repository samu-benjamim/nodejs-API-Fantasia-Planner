import fs from "fs";
import { pathUser } from "../../repositories/planner-gamified-repositories";
import { serviceListUser } from "../services-user/list-user";
import { UserModel } from "../../models/user-model";

const writeUser = (data: any) => {
  fs.writeFileSync(pathUser, JSON.stringify(data, null, 2), "utf-8");
};

export const serviceAddAchievements = async (userId: number) => {
  const usersResponse = await serviceListUser();
  const users = usersResponse.body as UserModel[];
  const user = users.find(u => u.id === userId);

  if (!user) {
    return { statusCode: 404, body: { error: "Usuário não encontrado" } };
  }

  const newAchievement = {
    id: user.achievements.length + 1,
    title: "Nova Conquista",
    description: "Conquista desbloqueada!",
    unlockedAt: new Date(), // usa Date, conforme seu AchievementModel
  };

  user.achievements.push(newAchievement);

  writeUser(users);

  return { statusCode: 200, body: user };
};
