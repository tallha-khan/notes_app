  require("dotenv").config();
  const passport = require("passport");
  const GoogleStrategy = require("passport-google-oauth20").Strategy;
  const User = require("../models/User");
  const jwt = require("jsonwebtoken");

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://notes-backend-7je9.onrender.com/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;

          // Find or create user
          let user = await User.findOne({ email });
          if (!user) {
            user = await User.create({ email });
          }

          // ✅ Return token with user object
          return done(null, {
            _id: user._id,
            token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
              expiresIn: "7d",
            }),
          });
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  // ✅ For session support
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
