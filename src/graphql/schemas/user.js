import Joi from "joi";

const objectId = Joi.string().label("Object ID");

const firstName = Joi.string().min(2).max(50).label("First Name");

const lastName = Joi.string().min(2).max(50).label("Last Name");

const userName = Joi.string().min(2).max(50).label("Username");

const email = Joi.string().email().label("Email");

const password = Joi.string().min(6).max(255).label("Password");

const dateOfBirth = Joi.date().label("Date of Birth");

const userId = Joi.string().label("User ID");

export const CreateUser = Joi.object().keys({
  _id: objectId,
  userId,
  firstName,
  lastName,
  userName,
  email,
  password,
  dateOfBirth,
});

export const UpdateUser = Joi.object().keys({
  _id: objectId,
  userId,
  firstName,
  lastName,
  userName,
  email,
  password,
  dateOfBirth,
});

export const DeleteUser = Joi.object().keys({
  _id: objectId,
  userId, 
});

export const LoginUser = Joi.object().keys({
  email,
  password,
});
