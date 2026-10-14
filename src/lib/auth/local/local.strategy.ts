import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { userIdentityModel } from "./user-identity.model";
import * as bcrypt from 'bcrypt';

passport.use(new localStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    async function(username, password, done) {
        try {
            const identity = await userIdentityModel.findOne({ 'credentials.username': username });
            if (!identity) {
                return done(null, false, { message: `username ${username} not found` });
            }

            const match = await bcrypt.compare(password, identity.credentials.hashedPassword);
            if (!match) {
                return done(null, false, { message: 'invalid password' });
            }

            const user = identity.toObject().user;
            
            done(null, user);

        } catch(err) {
            done(err);
        }
    }
))