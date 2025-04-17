import { test, expect } from "@playwright/test";

test("should allow user to sign in", async ({ page }) => {
  const UI_URL = "http://localhost:5173/";

  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("samar@dev.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in Successfully")).toBeVisible();

  await expect(page.getByRole("link", { name: "My Booking" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow user to create an account", async ({ page }) => {
  const UI_URL = "http://localhost:5173/";
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign in" }).click();
  await page.getByRole("link", { name: "Register" }).click();
  await expect(page.getByText("Create an account")).toBeVisible();

  await page.locator("[name = firstname]").fill("ankit");
  await page.locator("[name = lastname]").fill("padit");

  const USER_EMAIL = `test_user_${Math.floor(Math.random()*1000)}@dev.com`;
  await page.locator("[name = email]").fill(USER_EMAIL);
  await page.locator("[name = password]").fill("123456");
  await page.locator("[name = confirmPassword]").fill("123456");
  await page.getByRole("button", { name: "create account" }).click();

  await expect(page.getByText("registeration successfully")).toBeVisible();

  await expect(page.getByRole("link", { name: "My Booking" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
