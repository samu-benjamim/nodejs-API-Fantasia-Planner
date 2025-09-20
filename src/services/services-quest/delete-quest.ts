import { serviceListUser } from "../services-user/list-user";
import { UserModel } from "../../models/user-model";
import UserSchema from "../../models/schemas/user"
import { QuestModel } from "../../models/quest-model";

interface ResponseModel<T> {
  statusCode: number;
  body: T;
}

export const serviceDeleteQuest = async (
  idUser: number,
  questId: number
) => {
  const user = await UserSchema.findOne({ id: idUser })
  const quest: QuestModel = user?.quests.find(q => q.id === questId)

  const title = quest.title

  await UserSchema.findOneAndUpdate({id: idUser} ,  {$pull: {quests: {id: questId}}}, { new: true})
   
  return {
    statusCode: 200,
    body: { message: `A missão ${title} foi excluida com sucesso!` },
  };
};
