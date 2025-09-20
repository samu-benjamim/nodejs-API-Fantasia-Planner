import UserSchema from "../../models/schemas/user"

export const serviceSeeAchievements = async (idUser: number) => {
  const user = await UserSchema.findOne({ id: idUser })
  const achievementsUser = user?.achievements

  return {
    statusCode: 200,
    body: achievementsUser,
  }; 
};
