const Membership = require('../../../models/membership.js');

const MembershipQueryResolver = {
    Membership: async (_, { id }, context) => {
        try {
            console.log('Searching for membership with ID:', id);
            const membership = await Membership.findById(id);
            
            if (!membership) {
                throw new Error('Membership not found');
            }
            
            return membership;
        } catch (error) {
            console.error('Error fetching membership:', error);
            throw new Error(`Failed to fetch membership: ${error.message}`);
        }
    },
    
    Memberships: async (_, args, context) => {
        try {
            const membership = await Membership.find();
            
            return membership;
        } catch (error) {
            throw new Error(`Failed to fetch membership: ${error.message}`);
        }
    }
};

module.exports = MembershipQueryResolver;
