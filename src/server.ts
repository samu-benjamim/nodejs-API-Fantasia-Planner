import createApp from "./app"
import "dotenv/config"


const app= createApp()
const port = process.env.PORT;


app.listen(port, () => {
    console.log(`Você iniciou o sistema na porta ${port}`)
})