import UserSchema from "../models/schemas/user"

export const serviceRankingUser = async () => {
  const ranking = await UserSchema
  .find({}, {name: 1, level: 1, xp: 1})
  .sort({xp: -1})
  .lean();

  return {
    statusCode: 200,
    body: ranking,
  };
};
