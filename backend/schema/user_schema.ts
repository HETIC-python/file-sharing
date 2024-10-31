export const user_schema = {
    id: {
        optional: true,
        isUUID: true
    },
    firstName: {
        exists: true,
        notEmpty: true,
        escape: true
    },
    lastName: {
        exists: true,
        notEmpty: true,
        escape: true
    },
    email: {
        exists: true,
        isEmail: true,
        normalizeEmail: true
    },
    password: {
        exists: true,
        isLength: {
            options: { min: 6 }
        }
    },
    maxStorage: {
        exists: true,
        isInt: true
    },
    createdAt: {
        optional: true,
        isDate: true
    }
}