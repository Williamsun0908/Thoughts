import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

/* store whole user in session (good enough for demo) */
passport.serializeUser((u, done) => done(null, u));
passport.deserializeUser((obj, done) => done(null, obj));

const callbackURL =
  process.env.NODE_ENV === "production"
    ? "https://thoughtsoverflow.com/auth/google/callback"
    : "http://localhost:5001/auth/google/callback";

 passport.

passport.use(
  new GoogleStrategy(
    {
      clientID:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackURL,
    },
    (_at, _rt, profile, done) => {
      const user = {
        googleId: profile.id,
        name:     profile.displayName,
        email:    profile.emails?.[0]?.value,
        avatar:   profile.photos?.[0]?.value,
      };
      done(null, user);
    }
  )
);

export default passport;
