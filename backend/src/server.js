import express from "express"
import "dotenv/config.js";
import cors from "cors"
import writingRoutes from "./routes/writingRoutes.js"
import { connectDB } from "./config/db.js"

import session from "express-session"
import passport from "./config/passport.js"
import auth from "./routes/authRoutes.js"

const PORT = process.env.PORT
connectDB(process.env.DB_URI)

//testingonlyONLYONLY

// Middlewares //
const app = express()

// Google Auth
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: "lax" }
}));
app.use(passport.initialize());
app.use(passport.session());

// Convert raw text to JSON
app.use(express.json())

// Allow requests from different frontend PORT(default 5173).
app.use(cors({origin: "http://localhost:5173", credentials: true}))

app.use("/api/writings", writingRoutes)
app.use("/auth", auth);

app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT)
})