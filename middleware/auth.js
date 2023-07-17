const jwt = require("jsonwebtoken");
const { ApolloError } = require("apollo-server-errors");


module.exports = (context) => {

    const authHeader = context.req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split('Bearer')[1];

        if (token) {
            try {
                const user = jwt.verify(token, "UNSAFE_STRING");
                return user;
            }
            catch (err) {
                throw new ApolloError("Invalid Token/ Expired");
            }
        }
        throw new ApolloError("Authorization token must be Bearer token");
    }
    throw new ApolloError("Authorization header must be provided");
}