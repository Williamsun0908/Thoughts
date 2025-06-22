import { Router } from "express";
import passport from "../config/passport.js"

const r = Router();

r.get("/google",
  passport.authenticate("google", { scope: ["openid", "profile", "email"] })
);

r.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/login-failed" }),
  (_req, res) => res.redirect("https://thoughts-a94t.onrender.com/")
);

r.get("/login-failed", (_req, res) => res.status(401).send("Login failed"));
r.get("/logout", (req, res) => req.logout(() => res.redirect("https://thoughts-a94t.onrender.com")));
r.get("/current-user", (req, res) => res.json(req.user || null));

export default r;
