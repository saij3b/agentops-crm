import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

test('dashboard layout and stats cards', async ({ page }) => {
  // Desktop view
  await page.setViewportSize({ width: 1280, height: 720 });

  // Check sidebar visible on desktop
  const sidebar = page.locator('div.fixed.left-0.top-0');
  await expect(sidebar).toBeVisible();
  await expect(sidebar).toContainText('AgentOps CRM');

  // Check stats cards
  const statsCards = page.locator('.stats-container > div');
  await expect(statsCards).toHaveCount(8);

  // Take desktop screenshot
  await page.screenshot({ path: 'screenshot-desktop.png', fullPage: true });

  // Mobile view
  await page.setViewportSize({ width: 375, height: 667 });

  // Sidebar should be hidden initially on mobile (translated off-screen)
  // Our CSS uses -translate-x-full and lg:translate-x-0
  await expect(sidebar).not.toBeInViewport();

  // Mobile header should be visible
  const mobileHeader = page.locator('div.lg\\:hidden.flex');
  await expect(mobileHeader).toBeVisible();
  await expect(mobileHeader).toContainText('AgentOps CRM');

  // Open sidebar
  await page.click('button:has(svg)'); // The menu button
  await expect(sidebar).toBeInViewport();

  // Take mobile screenshot with sidebar open
  await page.screenshot({ path: 'screenshot-mobile-menu.png' });

  // Close sidebar
  await page.click('button:has(svg.lucide-x)');
  await expect(sidebar).not.toBeInViewport();

  // Take mobile screenshot
  await page.screenshot({ path: 'screenshot-mobile.png', fullPage: true });
});
