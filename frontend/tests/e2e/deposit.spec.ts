import { test, expect } from '@playwright/test';

test('reserve section renders and prompts wallet connection', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Reserve NOVA to fund science' })).toBeVisible();
  await expect(page.getByText('Reserve USDC in the Genesis pool to lock your NOVA allocation.')).toBeVisible();
  await expect(page.getByPlaceholder('0.00')).toBeVisible();
  await expect(page.locator('#deposit-section').getByRole('button', { name: 'Connect Wallet' })).toBeVisible();
  await expect(page.getByText('Contracts not configured')).toHaveCount(0);
});

test('progress widget shows milestone copy', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Next milestone', { exact: false })).toBeVisible();
  await expect(page.locator('p').filter({ hasText: 'Progress' }).first()).toBeVisible();
});
