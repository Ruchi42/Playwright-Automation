const{test, expect}= require('@playwright/test');
const { text } = require('stream/consumers');

test('validate error login', async ({page})=>
{
    //search ADIDAS ORIGINAL and add to cart
    const productname= "ADIDAS ORIGINAL";
    const mail= "ruchiverma42@gmail.com";
    const products= page.locator(".card-body"); //get all products list
    await page.goto("https://rahulshettyacademy.com/client");//goto website
    await page.locator("#userEmail").fill(mail); //fill username
    await page.locator("#userPassword").fill("Batch@123"); //fill password
    await page.locator("#login").click(); //click on login button

    await page.waitForLoadState('networkidle'); //wait for page to load first
    console.log(await page.locator(".card-body b").allTextContents()); //get all list(
        //Finds all <b> tags inside elements with class .card-body)

       const count= await products.count(); //total count of all products
       for (let i=0; i<count; ++i) //loop run for all counts
       {
      if(await products.nth(i).locator("b").textContent()=== productname)
      //products.nth(i).locator("b") is chaining from 2nd element scope from parent element which is (.card-body) to child '/b'
      {
        await products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
await page.locator("[routerlink*= 'cart']").click(); //click on cart button

//to check if ADIDAS-ORIGNAL is shown in cart
await page.locator("div li").first().waitFor(); //wait until items are loaded in cart section

const bool= await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible(); //locator based upon tab and text syntax
 //this is pseudoclass tag name h3, text-ADIDAS ORIGINAL    
expect(bool).toBeTruthy(); //assertion to expect return true value if ADIDAS ORIGINAL is visible

await page.locator("text= Checkout").click(); //click on checkout button

page.locator("[placeholder*='Country']").pressSequentially("ind"); //(dynamic dropdown)press letter one by one then only option show in country dropdown
const drop= page.locator(".ta-results"); //suggestion option dropdown box
await drop.waitFor(); //wait fot the suggestion option dropdown box to get open

const dropcount = await drop.locator("button").count(); //all three options count in dropbox
for(let i=0;i<dropcount; ++i) //loop to select india option
{
  const text= await drop.locator("button").nth(i).textContent();
  if(text===" India")
  {
 await drop.locator("button").nth(i).click();
 break;
  }
}
//assertion to check the first greyout mail id visible
expect(page.locator(".user__name [type='text']").first()).toHaveText(mail);

await page.locator(".action__submit").click(); //click on place order button

//assertion to check thankyou for the order text present
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
//grab  order ID text
const ID= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(ID);

//finding my order from order history page
await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();
const allrows=page.locator("tbody tr"); //all rows 
for(let i=0; i<allrows.count(); ++i)
{
   // to grab order id of my row
const orderID= await allrows.nth(i).locator("th").textContent();
if(ID.includes(orderID))
{
    await allrows.nth(i).locator("button").first().click(); //click on view button for the selected row
break;
}
}
const ordersummaryID= await page.locator(".col-text").textContent(); //check order id on summary page

expect(orderID.includes(ordersummaryID)).toBeTruthy();

}
);

