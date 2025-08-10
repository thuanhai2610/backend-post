import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        const jwtSecret = process.env.JWTSECRET;
        if (!jwtSecret) {
            throw new Error ('JWTSECRET env variable is not defined');
        } super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });

    };
    async validate(payload: any){
       return {userId: payload.sub, email: payload.email, role: payload.role};
    }

}