import { HttpMethod } from "../util/http-methods";
import { UserController, QuestController, AchievementController, RankingController } from "../controller/planner-gamified-controller";
import { RouteDef } from "./types";

export const routes: RouteDef[] = [
  { method: HttpMethod.GET, pattern: /^\/users$/, handler: UserController.list },
  { method: HttpMethod.GET, pattern: /^\/user\/(\d+)$/, handler: UserController.see },
  { method: HttpMethod.GET, pattern: /^\/user\/(\d+)\/quests$/, handler: QuestController.list },
  { method: HttpMethod.GET, pattern: /^\/user\/(\d+)\/achievements$/, handler: AchievementController.list },
  { method: HttpMethod.GET, pattern: /^\/ranking$/, handler: RankingController.list },

  { method: HttpMethod.POST, pattern: /^\/users$/, handler: UserController.create },
  { method: HttpMethod.POST, pattern: /^\/user\/(\d+)\/quests$/, handler: QuestController.create },

  { method: HttpMethod.PATCH, pattern: /^\/user\/(\d+)$/, handler: UserController.update },
  { method: HttpMethod.PATCH, pattern: /^\/user\/(\d+)\/quests\/(\d+)$/, handler: QuestController.update },

  { method: HttpMethod.DELETE, pattern: /^\/user\/(\d+)$/, handler: UserController.delete },
  { method: HttpMethod.DELETE, pattern: /^\/user\/(\d+)\/quests\/(\d+)$/, handler: QuestController.delete },
];
