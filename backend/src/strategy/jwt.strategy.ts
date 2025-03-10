import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

// class for addig the strategy for Guard of the api using jwt
@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt'
) {

    constructor(
        config: ConfigService,
        private prisma: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        })
    }

    async validate(payload: any) {

        // const user = await this.prisma.user.findUnique({
        //     where: {
        //         id: payload.sub
        //     }
        // })

        // delete user.hash;

        // return user;

        const user = { userId: payload.sub, email: payload.email };
        return user;
    }
}