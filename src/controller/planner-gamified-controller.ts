import { Response, Request } from "express";

import { serviceListUser } from "../services/services-user/list-user";
import { serviceCreateUser } from "../services/services-user/creat-user";
import { serviceSeeUser } from "../services/services-user/see-user";
import { serviceDeleteUser } from "../services/services-user/delete-user";
import { serviceUpdateUser } from "../services/services-user/update-user";
import { serviceCreateQuest } from "../services/services-quest/creat-quest";
import { serviceDeleteQuest } from "../services/services-quest/delete-quest";
import { serviceSeeQuests } from "../services/services-quest/see-quest";
import { serviceUpdateQuest } from "../services/services-quest/update-quest";
import { serviceSeeAchievements } from "../services/services-achievements/see-achievements";
import { serviceRankingUser } from "../services/service-ranking";
import singnup from "../util/crypt-password";

// 🔹 função auxiliar para responder
const sendResponse = (response: Response, content: { statusCode: number, body: any }) => {
  response.status(content.statusCode).json(content.body)
};

// 🔹 Controllers
export const UserController = {
  list: async (_req: Request, res: Response) => {
    sendResponse(res, await serviceListUser());
  },
  create: async (_req: Request, res: Response) => {
    const bodyValue = _req.body
    bodyValue.passwordHash = await singnup(bodyValue)
    console.log(bodyValue.password)
    sendResponse(res, await serviceCreateUser(bodyValue));
  },
  see: async (_req: Request, res: Response) => {
    const id = parseInt(_req.params.id);
    sendResponse(res, await serviceSeeUser(id));
  },
  delete: async (_req: Request, res: Response) => {
    const id = parseInt(_req.params.id);
    sendResponse(res, await serviceDeleteUser(id));
  },
  update: async (_req: Request, res: Response) => {
    const id = parseInt(_req.params.id);
    const bodyValue = _req.body; 
    sendResponse(res, await serviceUpdateUser(id, bodyValue));
  }
};

export const QuestController = {
  list: async (_req: Request, res: Response) => {
    const id = parseInt(_req.params.id);
    sendResponse(res, await serviceSeeQuests(id));
  },
  create: async (_req: Request, res: Response) => {
    const id = parseInt(_req.params.id);
    const bodyValue = _req.body;
    sendResponse(res, await serviceCreateQuest(id, bodyValue));
  },
  update: async (_req: Request, res: Response) => {
    const id = parseInt(_req.params.id);
    const questId = parseInt(_req.params.id2);
    const bodyValue = _req.body;
    sendResponse(res, await serviceUpdateQuest(id, questId, bodyValue));
  },
  delete: async (_req: Request, res: Response) => {
    const id = parseInt(_req.params.id);
    const questId = parseInt(_req.params.id2);
    sendResponse(res, await serviceDeleteQuest(id, questId));
  }
};

export const AchievementController = {
  list: async (_req: Request, res: Response) => {
    const id = parseInt(_req.params.id);
    sendResponse(res, await serviceSeeAchievements(id));
  }
};

export const RankingController = {
  list: async (_req: Request, res: Response) => {
    sendResponse(res, await serviceRankingUser());
  }
};
