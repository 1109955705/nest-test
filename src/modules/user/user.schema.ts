import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: number;

  @Prop()
  createTime: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// import * as mongoose from 'mongoose';

// export const UserSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   breed: String,
// });