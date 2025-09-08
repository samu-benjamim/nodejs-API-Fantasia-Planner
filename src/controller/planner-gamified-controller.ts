import { IncomingMessage, ServerResponse } from "http";
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
import { ContentType } from "../util/content-type";
import { getRequestBody } from "../util/getRequestBody";

// 🔹 função auxiliar para responder
const sendResponse = (response: ServerResponse, content: { statusCode: number, body: any }) => {
  response.writeHead(content.statusCode, { "Content-Type": ContentType.JSON });
  response.end(JSON.stringify(content.body));
};

// 🔹 Controllers
export const UserController = {
  list: async (_req: IncomingMessage, res: ServerResponse) => {
    sendResponse(res, await serviceListUser());
  },
  create: async (_req: IncomingMessage, res: ServerResponse) => {
    const data = await getRequestBody(_req);
    sendResponse(res, await serviceCreateUser(data));
  },
  see: async (_req: IncomingMessage, res: ServerResponse, params: string[]) => {
    const id = parseInt(params[0]);
    sendResponse(res, await serviceSeeUser(id));
  },
  delete: async (_req: IncomingMessage, res: ServerResponse, params: string[]) => {
    const id = parseInt(params[0]);
    sendResponse(res, await serviceDeleteUser(id));
  },
  update: async (_req: IncomingMessage, res: ServerResponse, params: string[]) => {
    const userId = parseInt(params[0]);
    const data = await getRequestBody(_req);
    sendResponse(res, await serviceUpdateUser(userId, data));
  }
};

export const QuestController = {
  list: async (_req: IncomingMessage, res: ServerResponse, params: string[]) => {
    const userId = parseInt(params[0]);
    sendResponse(res, await serviceSeeQuests(userId));
  },
  create: async (_req: IncomingMessage, res: ServerResponse, params: string[]) => {
    const userId = parseInt(params[0]);
    const data = await getRequestBody(_req);
    sendResponse(res, await serviceCreateQuest(userId, data));
  },
  update: async (_req: IncomingMessage, res: ServerResponse, params: string[]) => {
    const userId = parseInt(params[0]);
    const questId = parseInt(params[1]);
    const data = await getRequestBody(_req);
    sendResponse(res, await serviceUpdateQuest(userId, questId, data));
  },
  delete: async (_req: IncomingMessage, res: ServerResponse, params: string[]) => {
    const userId = parseInt(params[0]);
    const questId = parseInt(params[1]);
    sendResponse(res, await serviceDeleteQuest(userId, questId));
  }
};

export const AchievementController = {
  list: async (_req: IncomingMessage, res: ServerResponse, params: string[]) => {
    const userId = parseInt(params[0]);
    sendResponse(res, await serviceSeeAchievements(userId));
  }
};

export const RankingController = {
  list: async (_req: IncomingMessage, res: ServerResponse) => {
    sendResponse(res, await serviceRankingUser());
  }
};
