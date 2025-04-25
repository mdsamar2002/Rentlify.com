import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow user to sign in", async ({ page }) => {
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

test("should show search bar",async({page})=>{
    await page.goto(UI_URL);

    await page.getByPlaceholder("Your next destination...").fill("bangalore");
    await page.getByRole("button",{name:"Search"}).click();
    await expect(page.getByText("Hotels found")).toBeVisible();   
    await expect(page.getByText("samar")).toBeVisible();
})

test("should show hotel detai",async({page})=>{
  await page.goto(UI_URL);

  await page.getByPlaceholder("Your next destination...").fill("bangalore");
  await page.getByRole("button",{name:"Search"}).click();

  await page.getByText("samar").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button",{name:"Sign In to Book"})).toBeVisible();
})