import express from "express"
import "dotenv/config.js";
import cors from "cors"
import writingRoutes from "./routes/writingRoutes.js"
import { connectDB } from "./config/db.js"
import path from "path"

import session from "express-session"
import MongoStore from "connect-mongo"
import passport from "./config/passport.js"
import auth from "./routes/authRoutes.js"

const PORT = process.env.PORT
connectDB(process.env.DB_URI)



// Middlewares //
const app = express()

// Allow requests from different frontend PORT(default 5173).
if(process.env.NODE_ENV !== "production"){
  app.use(cors({
    origin: "http://localhost:5173", credentials: true
  }))
}

// For deployment
const __dirname = path.resolve()

// Google Auth
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URI,
    ttl: 60 * 60 * 24 * 7
  }),
  cookie: { 
    httpOnly: true, 
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}))
app.use(passport.initialize());
app.use(passport.session());

// Convert raw text to JSON
app.use(express.json())


app.use("/api/writings", writingRoutes)
app.use("/auth", auth);

// For deployment
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))
  app.get("/*thought",(req,res) =>  {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
})
}



app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT)
})