import { describe, expect, it } from "vitest";
import { ADMIN_ACCESS_ROLES, getAdminAccessRequestCopy } from "@/lib/admin-access-request-copy";

describe("getAdminAccessRequestCopy", () => {
    it("returns non-empty copy for every role", () => {
        for (const { id } of ADMIN_ACCESS_ROLES) {
            const text = getAdminAccessRequestCopy(id);
            expect(text.trim().length).toBeGreaterThan(80);
        }
    });

    it("design template mentions designer", () => {
        expect(getAdminAccessRequestCopy("design")).toMatch(/designer/i);
    });

    it("switches tone by role", () => {
        expect(getAdminAccessRequestCopy("sales")).toMatch(/sales team/i);
        expect(getAdminAccessRequestCopy("marketing")).toMatch(/marketing team/i);
        expect(getAdminAccessRequestCopy("general")).toMatch(/my role at Xero/i);
    });
});
