import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccessDocument = Access & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Access {
  @Prop()
  id: number;
}

export const AccessSchema = SchemaFactory.createForClass(Access);
