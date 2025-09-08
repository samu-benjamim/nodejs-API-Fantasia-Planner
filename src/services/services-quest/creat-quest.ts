import fs from "fs/promises";
import { pathUser } from "../../repositories/planner-gamified-repositories";
import { serviceListUser } from "../services-user/list-user";
import { UserModel } from "../../models/user-model";
import { QuestModel } from "../../models/quest-model";

interface ResponseModel<T> {
  statusCode: number;
  body: T;
}

interface CreateQuestDTO {
  title: string;
  description: string;
  status?: string;
  xpReward: number;
  deadline: Date;
}

const writeUser = async (data: UserModel[]) => {
  await fs.writeFile(pathUser, JSON.stringify(data, null, 2), "utf-8");
};

export const serviceCreateQuest = async (
  userId: number,
  questData: CreateQuestDTO
): Promise<ResponseModel<UserModel[]>> => {
  const usersResponse = await serviceListUser();
  const users = usersResponse.body;

  const user = users.find(u => u.id === userId);
  if (!user) {
    return { statusCode: 404, body: users };
  }

  // calcula ID único
  const nextId = user.quests.length > 0 ? Math.max(...user.quests.map(q => q.id)) + 1 : 1;

const newQuest: QuestModel = {
  id: nextId,
  title: "Elaborar ATA",
  description: "Elaborar ATA da reunião",
  status: questData.status || "Em andamento",
  xpReward: 50,
  deadline: new Date(questData.deadline),
};
  user.quests.push(newQuest);
  await writeUser(users);

  return {
    statusCode: 201,
    body: users,
  };
};
