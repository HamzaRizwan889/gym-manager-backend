const { gql } = require("apollo-server");

const roleType = gql`
  type Role {
    _id: ID
    name: String
    createdAt: String
    updatedAt: String
  }

  input RoleInput {
    name: String
  }

  type SuccessFullyCreatedRole {
    success: Boolean
    message: String
    role: Role
  }

  type SuccessFullyUpdatedRole {
    success: Boolean
    message: Boolean
    role: Role
  }

  type SuccessFullyDeletedRole {
    success: Boolean
    message: String
  }
`;

module.exports = { roleType };
