import { test, expect } from "@playwright/test";

test.describe("Dashboard", () => {
  test("loads dashboard and shows document collection title", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { name: /document collection/i })).toBeVisible();
  });

  test("shows clients table and main actions", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByRole("button", { name: /refresh all clients/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /send onboarding request/i })).toBeVisible();
  });

  test("can open onboarding modal", async ({ page }) => {
    await page.goto("/dashboard");
    await page.getByRole("button", { name: /send onboarding request/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });
});
