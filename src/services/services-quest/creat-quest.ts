import fs from "fs/promises";
import { pathUser } from "../../repositories/planner-gamified-repositories";
import { serviceListUser } from "../services-user/list-user";
import { UserModel } from "../../models/user-model";
import { QuestModel } from "../../models/quest-model";
import calculationDeadline from "../../util/calculation-deadline";
import { ResponseModel } from "../../models/response-model";

const writeUser = async (data: UserModel[]) => {
  await fs.writeFile(pathUser, JSON.stringify(data, null, 2), "utf-8");
};

export const serviceCreateQuest = async (
  id: number,
  body: QuestModel
): Promise<ResponseModel<UserModel | any>> => {
  const usersResponse = await serviceListUser();
  const users = usersResponse.body;

  const user = users.find(u => u.id === id);
  if (!user) {
    return { statusCode: 404, body: {massage: "Usuario não encontrado"} };
  }
  
  // calcula ID único
  const nextId = user.quests.length > 0 ? Math.max(...user.quests.map(d => d.id)) + 1 : 1;
  
  body.id = nextId
  body.deadline = await calculationDeadline(parseInt(body.deadline))
  
  user.quests.push(body);
  await writeUser(users);

  return {
    statusCode: 201,
    body: user,
  };
};
