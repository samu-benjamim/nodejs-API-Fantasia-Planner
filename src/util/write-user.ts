import { UserModel } from "../models/user-model";
import fs from "fs/promises";
import { pathUser } from "../repositories/planner-gamified-repositories";

async function postUser (data: UserModel[]) {
    await fs.writeFile(pathUser, JSON.stringify(data, null, 2), "utf-8");
}

export default postUser