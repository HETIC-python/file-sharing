export const file_schema = {
    id:{
        optional: true,
        isInt: true
    },
    filename: {
        exists: true,
        notEmpty: true,
        escape: true
    },
    size: {
        exists: true,
        isInt: true
    },
    mimeType: {
        exists: true,
        notEmpty: true
    },
    userId: {
        exists: true,
        isUUID: true
    }
}