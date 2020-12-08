const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const { ExtractJwt } = require("passport-jwt");
const { JWT_TOKEN, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = require("./../configs");
const User = require("./../models/user");


passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: JWT_TOKEN,
    },
    async (payload, done) => {
      try {
         const {sub} = payload;
         console.log("payload",payload);
         console.log("sub",sub);

         const user = await User.findOne({username:sub});
         if(!user){
           return done(null, false);
         }
         done(null, user);
      } catch (err) {
          done(err, false);
      }
    }
  )
);

passport.use(new LocalStrategy(
  { username:"username", email:"email"},
  async (username, password, done) => {
   try {
    const user = await User.findOne({username});
    if(!user){
      return done(null, false);
    }
    const isCorectPassword = await user.isValidPassword(password);
    if(!isCorectPassword) {
      return done(null, false);
    }
    done(null, user);
   } catch (error) {
    done(error, false);
   }
 }    
));

passport.use(new GooglePlusTokenStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
},async function(req, accessToken, profile, done) {
  try {
    // check user is exits in database
    const user = await User.findOne({
      authType: "google",
      authGoogleID: profile.id,
    });
    if(user){
      return done(null, user);
    }
    const newUser = new User({
      authType: "google",
      authGoogleID: profile.id,
      email: profile.emails[0].value,
      name:profile.displayName,
      username: profile.emails[0].value
    });
    await newUser.save();
    return done(null, user);
  } catch (error) {
    done(error, false);
  }
}));