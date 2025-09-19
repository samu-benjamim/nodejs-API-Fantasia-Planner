import { ErrorModel } from "./error-model";

export interface ResponseModel<T> {
  statusCode: number;
  body: T | ErrorModel;
}