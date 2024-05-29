const User = require('../../../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const UserMutationResolvers = {
  Login: async (parent, args, { req }, info) => {
    try {
      await loginSchema.validateAsync(args, { abortEarly: false });
      console.log(args.email, args.password);

      const user = await User.findOne({ email: args.email });
      if (!user) {
        console.log("User Not Found");
        throw new Error('User Not Found');
      }

      const validPassword = await bcrypt.compare(args.password, user.password);
      if (!validPassword) {
        console.log("Invalid Password");
        throw new Error('Invalid Password');
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

      return { user, token, message: "Login Successful" };
    } catch (error) {
      throw error;
    }
  },

  CreateUser: async (_, { input }, context) => {
    try {
      const { firstName, lastName, userName, email, password, dateOfBirth } = input;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        firstName,
        lastName,
        userName,
        email,
        password: hashedPassword,
        dateOfBirth,
      });

      const user = await newUser.save();

      return user;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  },
  
  UpdateUser: async (_, { id, input }, context) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }

      user.firstName = input.firstName;
      user.lastName = input.lastName;
      user.userName = input.userName;
      user.email = input.email;
      user.dateOfBirth = input.dateOfBirth;

      await user.save();

      return user;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  },

  DeleteUser: async (_, { id }, context) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }

      await user.remove();

      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  },
};

module.exports = UserMutationResolvers;
