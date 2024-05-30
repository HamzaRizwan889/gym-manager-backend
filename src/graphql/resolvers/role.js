const RoleQueryResolver = require("./queries/role");
const RoleMutationResolvers = require("./mutations/role");

module.exports = {
    Query: {
        ...RoleQueryResolver
    },
    Mutation: {
        ...RoleMutationResolvers
    }
};
