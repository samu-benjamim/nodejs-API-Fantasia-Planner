import { model, Schema } from "mongoose";

const UserSchema = new Schema ({
    id: {type: Number},
    name: { type: String, unique: true, require: true},
    email: { type: String, unique: true, require: true},
    passwordHash: { type: String, require: true},
    level: { type: Number, default: 0},
    xp: { type: Number, default: 0},
    quests: {type: Array},
    achievements: {type: Array},
    createdAt: { type: String, require: true},
    updatedAt: { type: String, require: true},
}
)

export default model("users", UserSchema)