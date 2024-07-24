// tests/e2e/index.spec.js

import { test, expect } from '@playwright/test'


test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Yachtmkt/);


});

test('Has a search button and when clicked with an empty input should redirect to /yachts', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.getByText('Search')).toBeVisible(); 

  await page.click('button:text("Search")')
  await expect(page).toHaveURL('http://localhost:3000/yachts')


});
