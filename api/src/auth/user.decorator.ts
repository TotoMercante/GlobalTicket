import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string | null, ctx: ExecutionContext) => {
    const req = ctx
      .switchToHttp()
      .getRequest<{ user?: { [key: string]: unknown } }>();
    return data ? req.user?.[data] : req.user;
  },
);
