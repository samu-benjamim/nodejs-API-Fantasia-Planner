import UserSchema from "../../models/schemas/user"


export const serviceDeleteUser = async (idUser: number) => {
  await UserSchema.deleteOne({ id: idUser })

  return {
    statusCode: 200,
    body: {message: `O usuario de id: ${idUser} foi deletado do banco de dados`},
  };
}
