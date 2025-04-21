const{test, expect}= require ('@playwright/test');

test("Dropdown selection", async({page})=>
{
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const user= page.locator ('#username');
const sign= await page.locator("#signInBtn");
const blink= page.locator("[href*='documents-request']");
const drop= await page.locator("select.form-control");
await drop.selectOption("consult"); //select 3rd dropdown option i.e, consult

await page.locator(".radiotextsty").last().click(); //select radiobutton
await page.locator("#okayBtn").click(); //click ok button

//assertion to check if radio button is checked ornot
await expect(page.locator(".radiotextsty").last()).toBeChecked();

//assertion to check the blinking text present or not
await expect(blink).toHaveAttribute("class","blinkingText"); //expect(locator).tohaveatrribute("class", "value")

await page.pause();

}
);