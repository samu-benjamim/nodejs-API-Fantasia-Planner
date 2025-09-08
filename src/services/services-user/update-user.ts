import fs from "fs/promises";
import { serviceListUser } from "./list-user";
import { UserModel } from "../../models/user-model";
import { ResponseModel } from "../../models/response-model";
import { pathUser } from "../../repositories/planner-gamified-repositories";

const writeUser = async (data: UserModel[]) => {
  await fs.writeFile(pathUser, JSON.stringify(data, null, 2), "utf-8");
};

export const serviceUpdateUser = async (
  userId: number,
  updateData: Partial<Omit<UserModel, "id" | "createdAt">>
): Promise<ResponseModel<{ message: string; user: UserModel }>> => {
  try {
    const usersResponse = await serviceListUser();
    const users = usersResponse.body;

    const index = users.findIndex(u => u.id === userId);
    if (index === -1) {
      return {
        statusCode: 404,
        body: { message: "Usuário não encontrado", user: {} as UserModel },
      };
    }

    // Atualiza apenas os campos fornecidos
    const user = users[index];
    const updatedUser: UserModel = {
      ...user,
      ...updateData,
      updatedAt: new Date(), // atualiza timestamp
    };

    users[index] = updatedUser;
    await writeUser(users);

    return {
      statusCode: 200,
      body: { message: "Usuário atualizado com sucesso", user: updatedUser },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: { message: "Erro ao atualizar usuário", user: {} as UserModel },
    };
  }
};
