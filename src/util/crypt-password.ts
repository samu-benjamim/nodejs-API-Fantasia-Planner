import bcrypt from "bcrypt"


async function singnup (body: any) {
    const hasPassword =  bcrypt.hashSync(body.passwordHash, 10)
    return hasPassword
} 

export default singnup