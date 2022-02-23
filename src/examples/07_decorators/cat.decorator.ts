import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cat = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.cat;
  },
);
