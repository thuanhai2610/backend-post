import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { RefreshToken } from "./refresh-token.schema";
import { Model } from "mongoose";

@Injectable()
export class RefreshTokenService{
    constructor(@InjectModel(RefreshToken.name) private readonly model:Model<RefreshToken>){}

    async create(userId: string, token: string){
        await this.model.deleteMany({userId});
        return this.model.create({userId, token});
    }
    

    async verify(userId: string, token: string){
        return this.model.findOne({userId, token});
    }
}