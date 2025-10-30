import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/database.js"

const app = express();

const PORT = process.env.PORT || 3000 ;
// database connection

await connectDB()

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=> res.send("Server is live..."))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});