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

//on blink text click, new window/tab open
test.only("Child window handling", async({browser})=>
{
    const context= await browser.newContext();
    const page= await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const blink= page.locator("[href*='documents-request']");

    //two steps, parallely run through promise.all array
   const [newPage]= await Promise.all (
        [
            context.waitForEvent('page'), //function is to observe if any new page or window is going to open.
            blink.click(),
        ]
    )
    //grab title shown on new page and print it
    const title1= await newPage.locator(".red").textContent();

    //grab email from the above title and put it in login page username field.
    const sp= title1.split("@");
    const domain= sp[1].split(" ")[0]; //right of @ and left of space give us the mail id

console.log(domain); //print the email id   
await page.locator("#username").fill(domain); //put it in login page username field.
await page.pause();
console.log(await page.locator("#username").textContent()); //print username text content i.e ID
  

}
);