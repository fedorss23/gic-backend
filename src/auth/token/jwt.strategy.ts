import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy, WithoutCallback, AllConstructorParameters } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from '../../user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() as string | null,
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT_SECRET') as WithoutCallback<AllConstructorParameters<Strategy>>,
        })
    }

    async validate({ id }: { id: string }) {
        return this.userService.getById(id)
    }
}
