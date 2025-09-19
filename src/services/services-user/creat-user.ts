import { serviceListUser } from "./list-user";
import { UserModel } from "../../models/user-model";
import registrationDate from "../../util/registration-date";
import { QuestModel } from "../../models/quest-model";
import calculationDeadline from "../../util/calculation-deadline";
import UserSchema from "../../models/schemas/user"


export const serviceCreateUser = async (newUser: UserModel) => {
  const usersResponse = await serviceListUser();
  const users = usersResponse.body;

  // calcula ID único
  const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1; //  verificar

  const deadlineQuestInital =  await calculationDeadline(5)

  const questInital:QuestModel =     {
      id: 1,
      title: "confirmação",
      description: "confirmação no e-mail",
      status: "Em andamento",
      xpReward: 10,
      deadline: deadlineQuestInital
    }

  newUser.id = newId;
  newUser.quests.push(questInital)
  newUser.createdAt = await registrationDate()
  newUser.updatedAt = await registrationDate()

  await UserSchema.create(newUser); 

  return {
    statusCode: 201,
    body: users,
  };
};
