const { gql } = require("apollo-server");

const userType = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    userName: String
    email: String
    password: String
    dateOfBirth: String
    createdAt: String
    updatedAt: String
  }

  input UserInput {
    firstName: String
    lastName: String
    userName: String
    email: String
    password: String
    dateOfBirth: String
  }

  type SuccessFullyCreatedUser {
    success: Boolean!
    message: String!
    user: User
  }

  type SuccessFullyUpdatedUser {
    success: Boolean!
    message: Boolean!
    user: User
  }

  type SuccessFullyDeletedUser {
    success: Boolean!
    message: String!
  }

  type AuthPayload {
    user: User
    token: String
    message: String
  }
`;

module.exports = { userType };
