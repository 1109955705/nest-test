import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Document } from 'mongoose';

export type UserRoleDocument = UserRole & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class UserRole {
  @Prop()
  userId: string;

  @Prop()
  roleId: Types.ObjectId;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);
