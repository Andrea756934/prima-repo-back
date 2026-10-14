import passport from "passport";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { userModel } from "../../../api/user/user.model";

passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'my_jwt_secret'
    },
    async (payload, done) => {
        try {
            const user = await userModel.findById(payload.id);
            if (user) {
                done(null, user.toObject())
            }
            else {
                done(null, false, { message: 'invalid token' });
            }
            
        } catch(err) {
            done(err);
        }
    })
)