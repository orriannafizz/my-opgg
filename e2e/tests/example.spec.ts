import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(baseURL!);
});
test('Check elements', async ({ page }) => {
  await page.locator('role=button[name="Search"i]').waitFor();
  await page.locator(`role=button[name="Taiwan"i]`).waitFor();
});
test('test right input', async ({ page, baseURL }) => {
  await page.getByLabel('Summoner').fill('Ricky1');
  await page.locator('role=button[name="Search"i]').click();
  await page.getByRole('link', { name: 'Ricky1' }).click();

  const url = page.url();
  const expectedStartOfURL = baseURL + '/summoner/TW2/';
  expect(url.startsWith(expectedStartOfURL)).toBe(true);
});

test('test wrong input', async ({ page }) => {
  await page.getByLabel('Summoner').fill('asdasda@@#@#@#@####****#*@*#sdasds@@@()@*(@*)#(*@asdsa');
  await page.locator('role=button[name="Search"i]').click();
  await page.locator('text=User not found').waitFor();
});

test('check summoner page', async ({ page }) => {
  await page.goto(
    '/summoner/TW2/hEn8vjIZnyTEkIXnbMob2kUEr5wFj014_HHQzZEbOggQjm08gNyrcnWWA_2PYOL9AVyj5MI1OYJkOA',
  );
  await page.locator('span').filter({ hasText: 'Ricky1' }).waitFor();
});
