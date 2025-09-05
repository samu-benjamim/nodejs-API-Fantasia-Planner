import * as http from "http";
import { app } from "./app";
import { serviceListUser } from "./services/services-user/list-user";

const server = http.createServer(app)

const port = process.env.PORT || 3000;
const content = serviceListUser

server.listen(port, () => {
    console.log(`Você inicio o sistema na porta ${port}`)
})