const { gql } = require("apollo-server");
const { userType } = require("./types/user");

import { GraphQLEnumType } from "graphql"


export default gql`
   type Query {
    User(id: ID!): User
    Users: [User]
  }

   type Mutation {
    CreateUser(input: UserInput): User
    UpdateUser(id: ID!, input: UserInput): User
    DeleteUser(id: ID!): Boolean
    Login(email: String!, password: String!): AuthPayload
  }
`;
