import UserSchema from "../models/schemas/user"


export const repositoryUser = async () => {
  const users = await UserSchema.find({})
    return users;
   
};

