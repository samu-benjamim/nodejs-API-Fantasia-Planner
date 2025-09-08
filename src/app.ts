import * as http from "http";
import { routes } from "./routes/routes";
import { HttpMethod } from "./util/http-methods";

export const app = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  const url = req.url?.split("?")[0] || "/";
  const method = req.method as HttpMethod;

  for (const route of routes) {
    if (method === route.method) {
      const match = url.match(route.pattern);
      if (match) {
        // match[0] é a URL completa, então pegamos match[1..] como array
        const params = match.slice(1); // string[]
        try {
          await route.handler(req, res, params);
        } catch (err) {
          console.error("Erro na rota:", err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "Erro interno do servidor" }));
        }
        return;
      }
    }
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "Rota não encontrada" }));
};
