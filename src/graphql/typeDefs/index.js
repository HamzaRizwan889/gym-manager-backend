import user from "./user";
import role from "./role";
import membership from "./membership";

const { userType } = require("./types/user");
const { roleType } = require("./types/role");
const { membershipType } = require("./types/membership");

export default [
    user, userType,
    role, roleType,
    membership, membershipType,
];