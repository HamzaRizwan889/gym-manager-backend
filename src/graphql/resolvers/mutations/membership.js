const Joi = require('joi');

// Define a schema for the input data using Joi
const schema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
});

const Membership = require('../../../models/membership.js');

const MembershipMutationResolvers = {
  CreateMembership: async (_, { input }, context) => {
    try {
      // Validate input data against the schema
      const { error } = schema.validate(input);
      if (error) {
        throw new Error(`Validation error: ${error.message}`);
      }

      const { name, price } = input;

      const newMembership = new Membership({
        name,
        price,
      });

      const membership = await newMembership.save();

      return {
        membership,
        message: 'Membership created successfully',
        success: true,
      };
    } catch (error) {
      throw new Error(`Failed to create membership: ${error.message}`);
    }
  },

  UpdateMembership: async (_, { id, input }, context) => {
    try {
      // Validate input data against the schema
      const { error } = schema.validate(input);
      if (error) {
        throw new Error(`Validation error: ${error.message}`);
      }

      const membership = await Membership.findById(id);
      if (!membership) {
        throw new Error('Membership not found');
      }

      membership.name = input.name;
      membership.price = input.price;

      await membership.save();

      return membership;
    } catch (error) {
      throw new Error(`Failed to update membership: ${error.message}`);
    }
  },

  DeleteMembership: async (_, { id }, context) => {
    try {
      const membership = await Membership.findById(id);
      if (!membership) {
        throw new Error('Membership not found');
      }

      await membership.remove();

      return { message: 'Membership deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete membership: ${error.message}`);
    }
  },
};

module.exports = MembershipMutationResolvers;
