import { test, expect } from "@playwright/test";
import path from "path";
const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("samar@dev.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in Successfully")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`)
  await page.locator("[name=name]").fill("test hotel");
  await page.locator("[name=city]").fill("chennai");
  await page.locator("[name=country]").fill("india");
  await page.locator("[name=description]").fill("test hotel description...");
  await page.locator("[name=pricePerNight]").fill("100");
  await page.selectOption("select[name=starRating]", "3");
  await page.getByText("Budget").click();
  await page.getByLabel("Free wifi").check();
  await page.getByLabel("Parking").check();
  await page.locator("[name=adultCount]").fill("3");
  await page.locator("[name=childCount]").fill("3");

  await page.locator("[name=imageFiles]").setInputFiles([
    path.join(__dirname,'./files/pic.jpg'),
    path.join(__dirname,'./files/pic2.png'),
  ]);
  await page.getByRole("button", { name: "Save" }).click();
});

// test ("should display hotels",async({page})=>{
//   await page.goto(`${UI_URL}my-hotel`);

//   await expect(page.getByText("My Hotels")).toBeVisible();
//   await expect(page.getByText("samar")).toBeVisible();
//   await expect(page.getByText("a beatiful villa with sea view...")).toBeVisible();
//   await expect(page.getByText("bangalore,india")).toBeVisible();
//   await expect(page.getByText("Beach Resort")).toBeVisible();
//   await expect(page.getByText("9999 per night")).toBeVisible();
//   await expect(page.getByText("1 adults 2 childs")).toBeVisible();
//   await expect(page.getByText("Rating")).toBeVisible();
//   await expect(page.getByRole('link',{name : "View Details"})).toBeVisible();
//   await expect(page.getByRole('link',{name : "Add Hotels"})).toBeVisible();
  
// })
