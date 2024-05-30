const Role = require('../../../models/role.js');

const roleMutationResolvers = {
    CreateRole: async (_, { input }, context) => {
        try {
          const { name } = input;
      
          const newRole = new Role({
            name,
          });
      
          const role = await newRole.save();
      
          return {
            role, 
            message: "Role created successfully",
            success: true,
          };
        } catch (error) {
          throw new Error(`Failed to create role: ${error.message}`);
        }
      },
  
  UpdateRole: async (_, { id, input }, context) => {
    try {
      const role = await Role.findById(id);
      if (!role) {
        throw new Error('Role not found');
      }

      role.name = input.name;

      await role.save();

      return role;
    } catch (error) {
      throw new Error(`Failed to update role: ${error.message}`);
    }
  },

  DeleteRole: async (_, { id }, context) => {
    try {
      const role = await Role.findById(id);
      if (!role) {
        throw new Error('Role not found');
      }

      await role.remove();

      return { message: 'Role deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete role: ${error.message}`);
    }
  },
};

module.exports = roleMutationResolvers;
