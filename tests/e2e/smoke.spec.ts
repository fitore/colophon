import { expect, test } from "@playwright/test";

test("homepage presents books and prints", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Bookstore,Press,Studio",
  );
  await expect(page.getByText("Book", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Print", { exact: true })).toBeVisible();
});

test("bookstore filters the shared catalogue", async ({ page }) => {
  await page.goto("/bookstore");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Bookstore");
  await expect(page.getByRole("heading", { name: "On Making" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "First Light" })).toBeVisible();
  await expect(page.getByText("A Field Guide to Paper")).toHaveCount(0);

  await page.getByRole("button", { name: "Prints", exact: true }).click();
  await expect(page.getByRole("heading", { name: "First Light" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "On Making" })).toHaveCount(0);
});

test("Press presents imprint books and supporting editorial", async ({ page }) => {
  await page.goto("/the-press");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("The Press");
  await expect(page.getByText("Colophon Editions", { exact: true })).toBeVisible();
  await expect(page.getByText("From the Workbench", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "On Making" })).toBeVisible();
});

test("Studio presents editions and programme content", async ({ page }) => {
  await page.goto("/studio");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("The Studio");
  await expect(page.getByText("Studio Editions", { exact: true })).toBeVisible();
  await expect(page.getByText("Programme Study", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "First Light" })).toBeVisible();
});
