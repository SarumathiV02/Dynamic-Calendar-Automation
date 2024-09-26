const { test, expect } = require('@playwright/test');
const moment = require('moment')


test("Calendar using fill function", async ({ page }) => {
    // Navigate to the page
    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo");

    // Define the date to be filled
    let date = "2002-10-26";

    // Fill the date in the date picker input field
    await page.fill("input[id='birthday']", date);

    // Wait for 3 seconds to observe the action
    await page.waitForTimeout(300000);
});

test("Calendar using moment package",async({page}) => {
    // Navigate to the page
    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo");

    //click to open the picker
    await page.click("//input[@placeholder='Start date']")

    // Calculate the target date dynamically using moment
    const targetDate = moment().add(6, 'days'); // Select 5 days from today
    const targetDay = targetDate.format('D'); // Get the day (e.g., "29")
    const targetMonth = targetDate.format('MMMM'); // Get the full month name (e.g., "October")
    const targetYear = targetDate.format('YYYY'); // Get the year (e.g., "2024")

    console.log(`Target Date: ${targetDay} ${targetMonth}, ${targetYear}`); 

    // Select the correct day (targetDay)
    // await page.click(`//td[@class='day' and text()='${targetDay}']`, { timeout: 60000 });
    async function navigateToMonthYear(targetMonth, targetYear){
    // Loop until the correct month and year are displayed
    while (true) {
        // Get the currently displayed month and year in the calendar header
        const currentMonthYear = await page.locator('.datepicker-days .datepicker-switch').textContent();

        // If current month and year match the target, stop
        if (currentMonthYear.includes(targetMonth) && currentMonthYear.includes(targetYear)) {
            break;
        }

        // Otherwise, click the "previous" button to go back to earlier dates
        await page.click('.prev'); // Clicking the "previous" button to go back in time   , { timeout: 600000 }

        // Wait for the calendar to update after the click (you may adjust this delay if needed)
        // await page.waitForTimeout(2000); // Wait for 2 seconds after each click
    }
}

    // Navigate to the correct month and year
    await navigateToMonthYear(targetMonth, targetYear);

    // Select the target day (24)
    await page.click(`//td[@class='day' and text()='${targetDay}']`);
    
    // Optionally verify the selected date
    const selectedDate = await page.locator("//input[@placeholder='Start date']").inputValue();
    console.log('Selected Date:', selectedDate);

});
