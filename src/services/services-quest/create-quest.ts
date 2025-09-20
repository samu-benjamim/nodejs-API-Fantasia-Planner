import { serviceListUser } from "../services-user/list-user";
import calculationDeadline from "../../util/calculation-deadline";
import UserSchema from "../../models/schemas/user"
import { QuestModel } from "../../models/quest-model";

export const serviceCreateQuest = async (
  idUser: number,
  newQuest: QuestModel
)=> {
  const user = await UserSchema.findOne({ id: idUser })

  const quests = user?.quests
  
  if (!quests || quests?.length == 0) {
    newQuest.id = 1
  } else {
    const lastQuest =quests[quests?.length - 1]
    newQuest.id = lastQuest.id + 1
  }

  newQuest.status = "Em andamento"

  const days = newQuest.deadline
  newQuest.deadline = await calculationDeadline(parseInt(days))

  await UserSchema.findOneAndUpdate({id: idUser} ,  {$push: {quests: newQuest}}, { new: true})

  return {
    statusCode: 201,
    body: newQuest,
  };
};
