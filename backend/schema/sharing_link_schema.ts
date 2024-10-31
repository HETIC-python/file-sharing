import { isDate } from "util/types";

export const sharing_link_schema = {
    id: {
        optional: true,
        isInt: true
    },
    link: {
        exists: true,
        notEmpty: true,
        escape: true
    },
    expiresAt: {
        exists: true,
        isDate: true
    },
    fileId: {
        exists: true,
        isUUID: true
    },
    createdAt: {
        exists: true,
        isDate: true
    },
}