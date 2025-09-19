import { repositoryUser } from "../../repositories/planner-gamified-repositories";

export const serviceListUser = async () => {
  const data = await repositoryUser();
  return {
    statusCode: 200,
    body: data, 
  };
};