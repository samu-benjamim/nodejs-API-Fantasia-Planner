import UserSchema from "../../models/schemas/user"

export const serviceSeeUser = async (idUser: number) => {
  const user = await UserSchema.findOne({ id: idUser });

  return {
    statusCode: 200,
    body: user,
  };
};