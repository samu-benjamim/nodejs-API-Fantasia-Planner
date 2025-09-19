import mongoose from "mongoose";
import "dotenv/config"

export async function connectDB() {
    const mongourl = process.env.URLMONGODB!

    try {
        await mongoose.connect(mongourl)
        console.log("Servidor Conectado")
    } catch (error: any) {
        console.log(error.message)
    }
}

export async function desconectDB() {
    await mongoose.disconnect()
    console.log("Servidor Desconectado")
}