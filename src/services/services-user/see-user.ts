import { serviceListUser } from "./list-user";
import { UserModel } from "../../models/user-model";
import { ResponseModel } from "../../models/response-model";

export const serviceSeeUser = async (id: string | number): Promise<ResponseModel<UserModel | {}>> => {
  const usersResponse = await serviceListUser();
  const users = usersResponse.body;

  // transforma id para number
  const userId = typeof id === "string" ? parseInt(id) : id;

  // busca usuário pelo id real
  const user = users.find(u => u.id === userId) || {};

  return {
    statusCode: 200,
    body: user,
  };
};
