import { Types } from 'mongoose';
export declare class User {
    username: string;
    password: string;
    pin: number;
    firstName: string;
    lastName: string;
    phone: string;
    position: string;
    department: string;
    role: Types.ObjectId;
    avatar: string;
    isActive: boolean;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User, any> & User & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>, {}> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
