import { IncomingMessage, ServerResponse } from "http";

export interface RouteDef {
  method: string;
  pattern: RegExp;
  handler: (req: IncomingMessage, res: ServerResponse, params: string[]) => void | Promise<void>;
}
