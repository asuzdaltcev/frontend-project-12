// @ts-check

import { test, expect } from '@playwright/test'

const registeredUser = {
  login: 'admin',
  password: 'admin',
}

// Исправлено: уникальное имя + достаточная длина пароля
const newUser = {
  login: `user${Date.now().toString().slice(-8)}`, // Уникальное имя до 12 символов
  password: 'password123', // 11 символов - точно пройдет валидацию
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.waitForTimeout(300)

  await page.locator('text=Hexlet Chat').first().click()
})

test.describe('registration', () => {
  test('handle new user creation', async ({ page }) => {
    await page.locator('text=Регистрация').first().click()
    await page.waitForURL('**/signup')
    
    // Исправлено: используем правильные селекторы для полей ввода
    await page.fill('input[name="username"]', newUser.login)
    await page.fill('input[name="password"]', newUser.password)
    await page.fill('input[name="confirmPassword"]', newUser.password)
    
    await page.locator('button[type="submit"]').first().click()
    await page.waitForURL('**/')
    
    // Теперь должно работать с role="button"
    await expect(await page.getByRole('button', { name: 'general' })).not.toHaveCount(0)
  })
})