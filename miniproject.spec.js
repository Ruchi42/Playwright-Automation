
const {test, expect}= require('@playwright/test');
test('miniproject', async({page})=>
{
await page.goto("https://www.demoblaze.com/");
const c= await page.title()
const phone= "Nokia lumia 1520";
console.log("Title of the page is:", c);
const products= await page.locator(".card-title a"); //get all products

console.log("list of all products are", await products.allTextContents()); //get all products title

await expect(products.first()).toBeVisible(); //assertion to check first element is visible
const count = await products.count();
for  (let i=0; i<count; ++i) //assertion to check each element is visible
{
await expect(products.nth(i)).toBeVisible();
}
await page.locator("#login2").click();
const a= await (page.locator('#logInModalLabel')).textContent();
console.log("login page title is", a);
await page.locator("#loginusername").fill("Ceao");
await page.locator("#loginpassword").fill("1234");
await page.locator('[onclick="logIn()"]').click();
await page.pause();
for (let i=0; i<count; i++)

{
    const PR= await products.nth(i).textContent();
    if (PR===phone)
    {
        await products.nth(i).click();
        break;

    }
}
await page.pause();
}
);

