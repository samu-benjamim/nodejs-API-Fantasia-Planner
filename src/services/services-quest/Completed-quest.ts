import { QuestModel } from "../../models/quest-model";
import registrationDate from "../../util/registration-date";
import UserSchema from "../../models/schemas/user"
import { AchievementModel } from "../../models/achievement-model";


export const serviceCompletedQuest = async (
  idUser: number,
  questId: number,
) => {
  const user = await UserSchema.findOne({ id: idUser })
  const quest: QuestModel = user?.quests.find(q => q.id === questId)
  const achievement: AchievementModel | any = user?.achievements

  let idNewAchievement
  if (Object.keys(achievement).length === 0){
    idNewAchievement = 1
  } else {
    const lastidAchievement = achievement[achievement.length -1]
    idNewAchievement = lastidAchievement.id + 1    
  }

  const newAchievement: AchievementModel = {
    id: idNewAchievement,
    title: quest.title,
    description: `Concluiu a missão: ${quest.title}`,
    unlockedAt: await registrationDate(),
  } 
  const title = quest.title


  await UserSchema.findOneAndUpdate(
    {id: idUser},  
    {
      $push: {achievements: newAchievement},
      $inc: {xp: quest?.xpReward},  
      $pull: {quests: {id: questId}}
    }, 
    { new: true}
  )
  return {
    statusCode: 200,
    body: { message: `A missão ${title} concluída com sucesso!` },
  };

};
