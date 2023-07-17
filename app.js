const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const MONGODB = "mongodb://localhost:27017/userAuth";

const typeDefs = require("./graphql/typeDefs.js");
const resolvers = require("./graphql/resolvers/index.js");


const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        return server.listen({ port: 5000 });
    }).then((res) => {
        console.log(`server is running at PORT ${res.url}`);
    });