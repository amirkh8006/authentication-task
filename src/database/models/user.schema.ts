import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'User', versionKey: false, timestamps: true })
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  pin: number;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phone: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Positions',
    set: (value: string) => new Types.ObjectId(value),
  })
  position: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Departments',
    set: (value: string) => new Types.ObjectId(value),
  })
  department: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Roles',
    set: (value: string) => new Types.ObjectId(value),
  })
  role: Types.ObjectId;

  @Prop()
  avatar: string;

  @Prop()
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
