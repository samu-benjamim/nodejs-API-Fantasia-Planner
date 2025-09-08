import { FilterModel } from "../../models/filter-model";
import { repositoryUser } from "../../repositories/planner-gamified-repositories";
import { UserModel } from "../../models/user-model";

export const serviceListUser = async (): Promise<FilterModel<UserModel>> => {
  const data = await repositoryUser();

  return {
    statusCode: 200,
    body: data, // já é UserModel[] com datas convertidas
  };
};