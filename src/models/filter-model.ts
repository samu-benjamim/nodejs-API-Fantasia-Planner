import { UserModel } from "./user-model";

export interface FilterModel {
    statusCode: number;
    body: UserModel[];
}