import express, {json} from  "express"
import cors from "cors"
import routes from "./routes/routes";
import { connectDB } from "./repositories/data/db";


function createApp() {
  const app = express()
  
  app.use(cors())

  connectDB()
  
  app.use(json())

  app.use("/game-system", routes);



  return app;  
}


export default createApp
