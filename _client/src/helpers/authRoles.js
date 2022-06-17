const authRoles = {
    admin: ['admin'],
    staff: ['admin', 'staff'],
    user: ['admin', 'staff', 'user'],
    all: ['admin', 'staff', 'user', 'guest'],
    onlyGuest: ['guest']
};

export default authRoles;
