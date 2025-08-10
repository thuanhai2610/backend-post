import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Otp, OtpDocument } from "./otp.schema";
import { Model } from "mongoose";
import * as nodemailer from 'nodemailer';

@Injectable()
export class OtpService{
    constructor(@InjectModel(Otp.name) private readonly model: Model<OtpDocument>){}

    async generateOTP(email: string): Promise<any>{
        const code = Math.floor(100000 + Math.random() *900000).toString();
        await this.model.deleteOne({email})
        await this.model.create({
            email,
            code,
            expiresAt: new Date(Date.now() + 5 * 10000),
        });
        this.sendMail(email, code);
        return code;
    }

    async sendMail(to: string, code: string){
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });
        await transport.sendMail({
            to,
            subject: 'Your OTP code',
            html: `<b> OTP code : ${code} <b>. 
            <b> Your OTP code effective for 10 minutes <b>. `
        })

    }

    async verifyOtp(email: string, code: string){
        const record = await this.model.findOne({email, code}).exec();
        if (!record || record.expiresAt < new Date()) return false;
        await this.model.deleteMany({email});
        return record;
    }
}