import {Pool} from "mysql2/promise";
import {SharingLinkI, SharingLinkRepositoryI} from "../type/sharing_link";

export function getSharingLinkRepository(database: Pool): SharingLinkRepositoryI {
    return {
        getAll: async () => {
            const [results] = await database.query("SELECT id, link, expires_at, user_id FROM links");
            return results as SharingLinkI[];
        },
        delete: async (id: number) => {
            await database.execute("DELETE FROM links WHERE id = ?", [id]);
        },
        getOne: async (id: number) => {
            const [results] = await database.execute("SELECT id, link, expires_at, user_id FROM links WHERE id = ?", [id]);
            //@ts-ignore
            return results[0];
        },
        insert(sharingLink: SharingLinkI): Promise<SharingLinkI> {
            database.execute("INSERT INTO links (link, expires_at, user_id) VALUES (?, ?, ?)", [sharingLink.link, sharingLink.expiresAt, sharingLink.fileId]);
            return Promise.resolve({link: sharingLink.link, expiresAt: sharingLink.expiresAt, fileId: sharingLink.fileId, createdAt: sharingLink.createdAt });
        },
        update(sharingLink: SharingLinkI): Promise<SharingLinkI> {
            database.execute("UPDATE links SET link = ?, expires_at = ?, user_id = ? WHERE id = ?", [sharingLink.link, sharingLink.expiresAt, sharingLink.fileId, sharingLink.id]);
            return Promise.resolve({id: sharingLink.id, link: sharingLink.link, expiresAt: sharingLink.expiresAt, fileId: sharingLink.fileId, createdAt: sharingLink.createdAt});
        },
        getOneByLink: async (link: string) => {
            const [results] = await database.execute("SELECT id, link, expires_at, user_id FROM links WHERE link = ?", [link]);
            //@ts-ignore
            return results[0];
        }
    };
}
