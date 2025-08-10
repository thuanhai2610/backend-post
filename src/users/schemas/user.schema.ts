import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type UserDocument = User & Document
@Schema({timestamps: true})
export class User{
    @Prop({required: true}) email: string;
    @Prop({required: true}) password: string;
    @Prop({default: 'user'}) role: string;
    @Prop({required: true}) isVerified: boolean;

}
export const UserSchema = SchemaFactory.createForClass(User);