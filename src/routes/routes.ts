import { Router } from  "express"
import { UserController, QuestController, AchievementController, RankingController } from "../controller/planner-gamified-controller";

const router =  Router()

router.get("/users", UserController.list)
router.get("/users/:id", UserController.see)
router.get("/users/:id/quests", QuestController.list)
router.get("/users/:id/achievents", AchievementController.list)
router.get("/ranking/", RankingController.list)

router.post("/users/", UserController.create)
router.post("/users/:id/quests", QuestController.create)

router.patch("/users/:id", UserController.update)
router.patch("/users/:id/quests/:id2", QuestController.update)

router.delete("/users/:id", UserController.delete)
router.delete("/users/:id/quests/:id2", QuestController.delete)

export default router
