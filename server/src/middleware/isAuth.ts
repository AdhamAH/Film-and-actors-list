import { MiddlewareFn } from 'type-graphql';
import { MyCtx } from '../types/myCtx';

export const isAuth: MiddlewareFn<MyCtx> = (
  { context },
  next
): Promise<{ error: string }> => {
  if (!context.req.session.userID) {
    throw new Error('not authenticated');
  } else {
    return next();
  }
};
