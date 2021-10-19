import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  author: string;
}
// { type: Types.ObjectId, ref: 'user_role' }
export const UserSchema = SchemaFactory.createForClass(User);
