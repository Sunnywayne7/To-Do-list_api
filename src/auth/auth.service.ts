import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as argon from 'argon2';
import { Model } from 'mongoose';
import { User } from 'schemas/user.schema';
import { AuthDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private config: ConfigService, private jwt: JwtService) {}

   async hashData(data: string) {
        return await argon.hash(data)
    }

    
   async signUp(dto: AuthDto) {
        const hash = await this.hashData(dto.password)
    
        const newUser = await this.userModel.create({
          email: dto.email,
          userName: dto.userName,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName
        }) 
        const tokens = await this.signToken(newUser.id, newUser.email);
        await this.updateRtHash(newUser.id, tokens.refreshToken)
        return tokens;

    }

    async signIn(dto:AuthDto) {
        const user = await this.userModel.findOne({email: dto.email});

        if(!user){
            throw new NotFoundException("Invalid credentials");
        };

        const pwMatches = await argon.verify(user.hash, dto.password);
        if(!pwMatches){
            throw new UnauthorizedException("Incorrect password");
        };
        const tokens = await this.signToken(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refreshToken);
        return tokens;
    }

    async googleLogin(user: any) {
        let existinguser = await this.userModel.findOne({ email: user.email})
        if(!existinguser) {
             existinguser = await this.userModel.create({
                email: user.email,
                userName: user.firstName,
                firstName: user.firstName,
                lastName: user.lastName
            })
        }

        const tokens = await this.signToken(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refreshToken);
        return tokens;
    }

    async refresh(userId: string, rt: string) {
        const user = await this.userModel.findById({ _id: userId});
        if(!user) throw new ForbiddenException('Access denied!!');
        const rtMatches = await argon.verify(user.hashedRt, rt);
        if(!rtMatches) throw new ForbiddenException('access denied!!!');
        const tokens = await this.signToken(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refreshToken);
        return tokens;
    }

   async signToken(userId: string, email: string) {
        const[ at, rt ]= await Promise.all ([
            this.jwt.signAsync({
                sub: userId,
                email
            }, {
                secret: this.config.get('SECRET'),
                expiresIn:'15m'
            }), 

            this.jwt.signAsync({
                sub: userId,
                email
            }, {
                secret: this.config.get('RT-SECRET'),
                expiresIn: '7d'
            })

        ])
        return {
            accessToken: at,
            refreshToken: rt
        }
    }

    async updateRtHash(userId: string, rt: string){
        const hash = await this.hashData(rt)
        await this.userModel.findByIdAndUpdate(
            userId,    
            {
                $set: {
                    hashedRt: hash
                }
            }, {new: true}
        )
        
    }
}
