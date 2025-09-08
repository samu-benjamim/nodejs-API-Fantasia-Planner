import fs from "fs/promises";
import { serviceListUser } from "./list-user";
import { UserModel } from "../../models/user-model";
import { pathUser } from "../../repositories/planner-gamified-repositories";
import { FilterModel } from "../../models/filter-model";

const writeUser = async (data: UserModel[]) => {
  await fs.writeFile(pathUser, JSON.stringify(data, null, 2), "utf-8");
};

interface CreateUserDTO {
  name: string;
  email: string;
  passwordHash: string;
}

export const serviceCreateUser = async (data: CreateUserDTO): Promise<FilterModel<UserModel>> => {
  const usersResponse = await serviceListUser();
  const users = usersResponse.body;

  // calcula ID único
  const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

  const newUser: UserModel = {
    id: newId,
    name: data.name,
    email: data.email,
    passwordHash: data.passwordHash,
    level: 1,
    xp: 0,
    quests: [],
    achievements: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  users.push(newUser);
  await writeUser(users);

  return {
    statusCode: 201,
    body: users,
  };
};
