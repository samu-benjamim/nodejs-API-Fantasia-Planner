import { serviceListUser } from "./services-user/list-user";
import { UserModel } from "../models/user-model"; // aproveitando tipagem

interface ResponseFormat<T> {
  statusCode: number;
  body: T;
}

export const serviceRankingUser = async (): Promise<ResponseFormat<Partial<UserModel>[]>> => {
  const users = await serviceListUser();

  // garante que body é um array antes de manipular
  const body = Array.isArray(users.body) ? users.body as UserModel[] : [];

  // organiza ranking
  const ranking = body
    .sort((a, b) => b.xp - a.xp)
    .map((user) => ({
      name: user.name,
      level: user.level,
      xp: user.xp,
    }));

  return {
    statusCode: 200,
    body: ranking,
  };
};
