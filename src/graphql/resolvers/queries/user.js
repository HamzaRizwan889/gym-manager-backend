const User  = require('../../../models/user.js');

const UserQueryResolver = {
    User: async (_, { id }, context) => {
        try {
            console.log('Searching for user with ID:', id);
            const user = await User.findById(id);
            
            if (!user) {
                throw new Error('User not found');
            }
            
            return user;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw new Error(`Failed to fetch user: ${error.message}`);
        }
    },
    
    Users: async (_, args, context) => {
        try {
            const users = await User.find();
            
            return users;
        } catch (error) {
            throw new Error(`Failed to fetch users: ${error.message}`);
        }
    }
};

module.exports = UserQueryResolver;
