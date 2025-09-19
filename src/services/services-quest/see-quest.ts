import UserSchema from "../../models/schemas/user"

export const serviceSeeQuests = async (
  idUser: number
) => {
  const user = await UserSchema.findOne({ id: idUser })
  const questsUser = user?.quests


  return {
    statusCode: 200,
    body: questsUser,
  }; 
};
