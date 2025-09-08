import fs from "fs/promises"; // versão async
import path from "path";
import { UserModel } from "../models/user-model";

export const pathUser = path.join(__dirname, "../repositories/planner-gamified.json");

export const repositoryUser = async (): Promise<UserModel[]> => {
  try {
    const rawUser = await fs.readFile(pathUser, "utf-8");
    const jsonFile = JSON.parse(rawUser);

    // transforma datas de string para Date
    const users: UserModel[] = jsonFile.map((u: any) => ({
      ...u,
      id: Number(u.id),
      createdAt: new Date(u.createdAt),
      updatedAt: new Date(u.updatedAt),
      quests: u.quests.map((q: any) => ({
        ...q,
        deadline: new Date(q.deadline),
        status: q.status as "pending" | "in_progress" | "completed",
      })),
      achievements: u.achievements.map((a: any) => ({
        ...a,
        unlockedAt: new Date(a.unlocked_at),
      })),
    }));

    return users;
  } catch (err) {
    console.error("Erro ao ler o arquivo de usuários:", err);
    return []; // retorna array vazio em caso de erro
  }
};