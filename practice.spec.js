const{test, expect}= require ('@playwright/test');
test("navigation&capturing", async({page})=>
    {
 await page.goto("https://sso.teachable.com/secure/9521/identity/login/otp");
 //check if login button is  visible  
const btn= await page.locator('#btn-login');
 await expect('btn').toBeVisible();
 console.log("login button visible");


}
);
