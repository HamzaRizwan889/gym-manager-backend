const UserQueryResolver = require("./queries/user");
const UserMutationResolvers = require("./mutations/user");

module.exports = {
    Query: {
        ...UserQueryResolver
    },
    Mutation: {
        ...UserMutationResolvers
    }
};