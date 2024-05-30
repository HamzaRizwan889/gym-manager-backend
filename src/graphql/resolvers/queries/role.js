const Role = require('../../../models/role.js');

const roleQueryResolver = {
    Role: async (_, { id }, context) => {
        try {
            console.log('Searching for role with ID:', id);
            const role = await Role.findById(id);
            
            if (!role) {
                throw new Error('Role not found');
            }
            
            return role;
        } catch (error) {
            console.error('Error fetching role:', error);
            throw new Error(`Failed to fetch role: ${error.message}`);
        }
    },
    
    Roles: async (_, args, context) => {
        try {
            const roles = await Role.find();
            
            return roles;
        } catch (error) {
            throw new Error(`Failed to fetch roles: ${error.message}`);
        }
    }
};

module.exports = roleQueryResolver;
