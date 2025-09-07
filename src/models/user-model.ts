import { AchievementModel } from "./filter-achievement";
import { QuestModel } from "./quest-model";


export interface UserModel {
    id: any;
    name: string;
    email: string;
    passwordHash: string;
    level: number;
    xp: number;
    quests: QuestModel[];
    achievements: AchievementModel[];
    createdAt: string;
    updatedAt: string;
}