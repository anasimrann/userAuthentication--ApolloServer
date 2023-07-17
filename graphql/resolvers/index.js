const messagesResolvers = require('./message');
const user              = require('./user');
module.exports = {
    Query: {
        ...messagesResolvers.Query,
        ...user.Query
    },
    Mutation: {
        ...messagesResolvers.Mutation,
        ...user.Mutation
    },
};