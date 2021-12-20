import { Response, Request } from 'express';

interface SessionData {
  userID: number;
}
export type MyCtx = {
  req: Request & { session: SessionData };
  res: Response;
};
