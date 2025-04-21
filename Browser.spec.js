
const{test, expect}= require('@playwright/test');

test.only('browser test', async({browser})=> //browser is a fixture to invoke browser inside function
//  i.e its a parameter for test function
{
const BR= await browser.newContext(); //open fresh chrome instance
const page= await BR.newPage();

const user= await page.locator('#username'); //store username page locator in variable to reuse it ON REPEAT
const sign= await page.locator("#signInBtn");

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());

//locator to find element and login by entering value
await user.fill("rahulshetty");
await page.locator("[type='password']").fill("learning");
await sign.click();

//if wrong username given then assertion check that error is showing up and print it
console.log(await page.locator("[style*='block']").textContent());

//assertion to check that error text contain 'Incorrect' keyword.
await expect (page.locator("[style*='block']")).toContainText('Incorrect');

await user.fill(""); //fill("") to remove existing entered username value.
await user.fill("rahulshettyacademy");
await sign.click();

//get title of first and second phone and print it
console.log(await page.locator(".card-body a").first().textContent()); 
console.log(await page.locator(".card-body a").nth(1).textContent()); 

} 
);

//OR

test('page test', async ({page})=>
{
    await page.goto("https://google.com");
    await page.waitForTimeout(2000); 

   // get title- assertion
    console.log(await page.title());

   // expect-automatic assertion
    await expect(page).toHaveTitle("Google");
}
);

