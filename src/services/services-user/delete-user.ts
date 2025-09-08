import fs from "fs/promises";
import { pathUser } from "../../repositories/planner-gamified-repositories";
import { serviceListUser } from "./list-user";
import { FilterModel } from "../../models/filter-model";
import { UserModel } from "../../models/user-model";

const writeUser = async (data: UserModel[]) => {
  await fs.writeFile(pathUser, JSON.stringify(data, null, 2), "utf-8");
};

export const serviceDeleteUser = async (id: string | number): Promise<FilterModel<UserModel>> => {
  const userId = typeof id === "string" ? parseInt(id) : id;
  const usersResponse = await serviceListUser();
  let users = usersResponse.body;

  // filtra todos os usuários, exceto o que será deletado
  const filteredUsers = users.filter(u => u.id !== userId);

  await writeUser(filteredUsers);

  return {
    statusCode: 200,
    body: filteredUsers,
  };
};
