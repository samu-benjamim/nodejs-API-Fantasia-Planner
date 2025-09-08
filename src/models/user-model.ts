import { AchievementModel } from "./achievement-model";
import { QuestModel } from "./quest-model";

export interface UserModel {
  id: number; // evitar any
  name: string;
  email: string;
  passwordHash: string;
  level: number;
  xp: number;
  quests: QuestModel[];
  achievements: AchievementModel[];
  createdAt: Date;
  updatedAt: Date;
}