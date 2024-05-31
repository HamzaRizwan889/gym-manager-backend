const { gql } = require("apollo-server");
const { membershipType } = require("./types/membership");

import { GraphQLEnumType } from "graphql"

export default gql`
  type Query {
    Membership(id: ID!): Membership
    Memberships: [Membership]
}

  type Mutation {
    CreateMembership(input: MembershipInput): SuccessFullyCreatedMembership
    UpdateMembership(id: ID!, input: MembershipInput): SuccessFullyUpdatedMembership
    DeleteMembership(id: ID!): SuccessFullyDeletedMembership
  }
`;

