import { FilterModel } from "../../models/filter-model";
import { repositoryUser } from "../../repositories/planner-gamified-repositories";

export const serviceListUser = async (): Promise<FilterModel> => {
    let responseFormat: FilterModel = {
        statusCode: 0,
        body: [],
    }

    const data = await repositoryUser();

    responseFormat.statusCode = 200;
    responseFormat.body = data


    return responseFormat
}