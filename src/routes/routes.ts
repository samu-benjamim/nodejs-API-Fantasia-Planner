export enum Route{
    CREATE = "/user",
    LIST = "/user/list",
    USER = "/user/:id",
    QUEST = "/user/:id/quests",
    QUESTID = "/user/:id/quests/:questsId",
    ADDXP = "/users/:id/progress/xp",
    RANKING = "/ranking",
    ACHIEVEMENTS = "/user/:id/achievements",
}