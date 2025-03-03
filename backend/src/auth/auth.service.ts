import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto, SigninDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ){}

    /**
     * 
     * @param dto receive the data of the new user
     * @returns a token
     */
    async signup(dto: SignupDto) {

        // generate a hash password 
        const hash = await argon.hash(dto.password);

        // send and save the user in the db
        try {

            const user = await this.prisma.users.create({
                data: {
                    username: dto.username,
                    email: dto.email,
                    password: hash
                }
            });

            return {
                "message": "User created successfully."
            }

        }catch(error) {

            if(error instanceof PrismaClientKnownRequestError) {

                if(error.code === 'P2002') {
                    throw new ForbiddenException('All credentials already exists for another user')
                }
            }
            throw error;
        }

    }

    /**
     * 
     * @param dto object containing the email and password
     * @returns a token
     */
    async signin(dto: SigninDto) {

        // find the user by email in the database
        const user = await this.prisma.users.findUnique({
            where: {
                email: dto.email,
            }
        })

        // if user does not exist
        if(!user) {
            throw new ForbiddenException('Email or password invalid');
        }

        // compare password
        const passwordMatches = await argon.verify(
            user.password,
            dto.password
        );

        // if password incorrect
        if(!passwordMatches) {
            throw new ForbiddenException('Email or password invalid');
        }

        return this.generateToken(user.id, user.email);
    }


    /**
     * 
     * @param userId 
     * @param email 
     * @returns an object of token
     */
    async generateToken(
        userId: number,
        email: string
    ): Promise<{ access_token: string }> {

        // generate the payload for creating the JWT
        const payload = {
            sub: userId,
            email
        };

        // take the secret string from .env file
        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload,{
                expiresIn: '60m',
                secret: secret
        });

        return { access_token: token };
    }
}
