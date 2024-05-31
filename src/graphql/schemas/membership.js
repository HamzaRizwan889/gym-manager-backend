import Joi from "joi";

const membershipId = Joi.string().label("Membership ID");

const membershipName = Joi.string().min(2).max(50).label("Membership Name");

const membershipPrice = Joi.string().min(2).max(50).label("Membership Price");

export const CreateMembership = Joi.object().keys({
  _id: membershipId,
  name: membershipName.required(),
  price: membershipPrice.required()
});

export const UpdateMembership = Joi.object().keys({
    _id: membershipId.required(),
    name: membershipName.required(),
    price: membershipPrice.required()
});

export const DeleteMembership = Joi.object().keys({
    _id: membershipId.required(),
});
