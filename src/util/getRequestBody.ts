import { IncomingMessage } from "http";

export const getRequestBody = (req: IncomingMessage) => {
  return new Promise<any>((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      if (!body) {
        resolve({}); // se vazio, retorna objeto vazio
      } else {
        try {
          resolve(JSON.parse(body));
        } catch (err) {
          reject(new Error("Corpo da requisição não é um JSON válido"));
        }
      }
    });
    req.on("error", reject);
  });
};
