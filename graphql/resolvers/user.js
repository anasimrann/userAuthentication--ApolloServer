const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


const User = require("../../model/User");
module.exports = {
    Mutation: {
        async registerUser(_, { input: { username, email, password } }) {
            //check if any user exist already
            const oldUser = await User.findOne({ email });
            if (oldUser) {
                throw new ApolloError("A user is already registered with this email" + email);
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                email: email.toLowerCase(),
                password: hashPassword
            });

            const token = jwt.sign({ user_id: newUser._id, email }, "UNSAFE_STRING", { expiresIn: "2h" })
            newUser.token = token;

            const res = await newUser.save();

            return {
                id: res._id,
                ...res._doc
            }
        },
        async loginUser(_, { input: { email, password } }) {
            const user = await User.findOne({ email });
            if (user && (await bcrypt.compare(password, user.password))) {
                //create a new token
                const token = jwt.sign({ user_id: user._id, email }, "UNSAFE_STRING", { expiresIn: "2h" })
                user.token = token
                return {
                    id: user._id,
                    ...user._doc
                }
            }
            else {
                throw new AppolloError("Incorrect Password");
            }
        }
    },
    Query: {
        user: (_, { ID }) => User.findById(ID)
    }
}