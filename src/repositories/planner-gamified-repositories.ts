import fs from "fs";
import path from "path";

import { UserModel } from "../models/user-model";

export const pathUser = path.join(__dirname, "../repositories/planner-gamified.json")


export const repositoryUser = async (): Promise<UserModel[]> => {
    const rawUser =  fs.readFileSync(pathUser, "utf-8")
    let jsonFile = JSON.parse(rawUser);

    return jsonFile

}