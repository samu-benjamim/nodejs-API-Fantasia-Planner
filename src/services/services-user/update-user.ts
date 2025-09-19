import registrationDate from "../../util/registration-date";
import UserSchema from "../../models/schemas/user"

export const serviceUpdateUser = async (
  idUser: number,
  updateData: any
) => {
  const user = await UserSchema.findOne({ id: idUser })
  const dateNow = await registrationDate()
  updateData.updatedAt = dateNow
  await UserSchema.findOneAndUpdate({ id: idUser },  updateData )

  return {
    statusCode: 200,
    body: { user: user },
  };
};
