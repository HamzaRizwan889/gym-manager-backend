const { gql } = require("apollo-server");

const membershipType = gql`
  type Membership {
    _id: ID
    name: String
    price: String
    createdAt: String
    updatedAt: String
  }

  input MembershipInput {
    name: String
    price: String
  }

  type SuccessFullyCreatedMembership {
    success: Boolean
    message: String
    membership: Membership
  }

  type SuccessFullyUpdatedMembership {
    success: Boolean
    message: Boolean
    membership: Membership
  }

  type SuccessFullyDeletedMembership {
    success: Boolean
    message: String
  }
`;

module.exports = { membershipType };
