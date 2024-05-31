const MembershipQueryResolver = require("./queries/membership");
const MembershipMutationResolvers = require("./mutations/membership");

module.exports = {
    Query: {
        ...MembershipQueryResolver
    },
    Mutation: {
        ...MembershipMutationResolvers
    }
};
