export interface QuestModel {
    id: number;
    title: string;
    description: string;
    status: string;
    xpReward: number;
    deadline: Date; // usa Date em vez de string
}