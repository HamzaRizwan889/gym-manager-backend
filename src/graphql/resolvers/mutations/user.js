const User = require('../../../models/user.js');
const Role = require('../../../models/role.js');
const Membership = require('../../../models/membership.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import Joi from "joi";
const moment = require('moment');

const isValidDateOfBirth = (dateOfBirth) => {
    return moment(dateOfBirth, 'YYYY-MM-DD', true).isValid();
};

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

   CreateUser : async (_, { input }, context) => {
    try {
      const { firstName, lastName, userName, email, password, dateOfBirth, roles, membership } = input;
  
      if (!firstName || !lastName || !userName || !email || !password || !dateOfBirth || !roles.length || !membership.length) {
        throw new Error('All fields must be filled');
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }

      if (!isValidDateOfBirth(dateOfBirth)) {
        console.log(dateOfBirth)
        throw new Error('Invalid date of birth format. Please use dd/mm/yyyy', dateOfBirth);
    }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const roleDocs = await Role.find({ _id: { $in: roles } });
      if (roleDocs.length !== roles.length) {
        throw new Error('Please select the role');
      }

      const membershipDocs = await Membership.find({ _id: { $in: membership } });
      if (membershipDocs.length !== membership.length) {
        throw new Error('Please select the membership');
      }
  
      const newUser = new User({
        firstName,
        lastName,
        userName,
        email,
        password: hashedPassword,
        dateOfBirth,
        roles: roleDocs.map(role => role._id),
        membership: membershipDocs.map(membership => membership._id)
      });
  
      const user = await newUser.save();
  
      const populatedUserRoles = await User.findById(user._id).populate('roles');
      const populatedUser = await User.findById(populatedUserRoles._id).populate('membership');
    
      return populatedUser;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  },
  
   UpdateUser : async (_, { id, input }, context) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
  
      const { firstName, lastName, userName, email, password, dateOfBirth, roles, membership } = input;
  
      if (!firstName || !lastName || !userName || !email || !dateOfBirth || !roles.length || !membership.length) {
        throw new Error('All fields must be filled');
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }

     if (!isValidDateOfBirth(dateOfBirth)) {
            throw new Error('Invalid date of birth format. Please use dd/mm/yyyy');
        }

      user.firstName = firstName;
      user.lastName = lastName;
      user.userName = userName;
      user.email = email;
      user.dateOfBirth = dateOfBirth;
      user.roles = roles;
      user.membership = membership;
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
  
      await user.save();
  
      return user;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  },
  
  DeleteUser: async (_, { id }, context) => {
    try {
        const deletedUser = await User.deleteOne({ _id: id });
        if (deletedUser.deletedCount === 0) {
            throw new Error('User not found');
        }
        return true; // Return true if deletion is successful
    } catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
    }
},


};

module.exports = UserMutationResolvers;
