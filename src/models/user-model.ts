export interface UserModel {
    _id: number;
    name: string;
    email: string;
    passwordHash: string;
    level: number;
    xp: number;
    quests: [];
    achievements: [];
    createdAt: string;
    updatedAt: string;
}