import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ timestamps: true })
export class RefreshToken {
    @Prop({required: true})
    userId: string;

    @Prop({required: true})
    token: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);