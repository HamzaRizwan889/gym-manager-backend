import Joi from "joi";

const roleId = Joi.string().label("Role ID");

const roleName = Joi.string().min(2).max(50).label("Role Name");

export const CreateRole = Joi.object().keys({
  _id: roleId,
  name: roleName.required(),
});

export const UpdateRole = Joi.object().keys({
  _id: roleId.required(),
  name: roleName,
});

export const DeleteRole = Joi.object().keys({
  _id: roleId.required(),
});
