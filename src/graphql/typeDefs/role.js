const { gql } = require("apollo-server");
const { userType } = require("./types/user");

import { GraphQLEnumType } from "graphql"

export default gql`
  type Query {
    Role(id: ID!): Role
    Roles: [Role]
}

  type Mutation {
    CreateRole(input: RoleInput): SuccessFullyCreatedRole
    UpdateRole(id: ID!, input: RoleInput): SuccessFullyUpdatedRole
    DeleteRole(id: ID!): SuccessFullyDeletedRole
  }
`;

