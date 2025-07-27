import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { User } from "@prisma/client"
import { HttpArgumentsHost } from "@nestjs/common/interfaces";


interface IHttpRequest extends HttpArgumentsHost {
    user: User
}

export const CurrentUser = createParamDecorator(
    (data: keyof User, ctx: ExecutionContext) => {
        const request: IHttpRequest = ctx.switchToHttp().getRequest()
        const user = request.user

        return data ? user[data] : user
    }
)