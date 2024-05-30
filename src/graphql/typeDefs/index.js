import user from "./user";
import role from "./role";

const { userType } = require("./types/user");
const { roleType } = require("./types/role");

export default [
    user, userType,
    role, roleType,
];