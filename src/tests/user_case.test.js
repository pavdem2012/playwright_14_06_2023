import siteMap from '../framework/config/siteMap.js'
import LoginPage, { user } from '../framework/pages/LoginPage.js'
import { expect } from 'chai'
import { chromium } from 'playwright'
import BasePage from '../framework/pages/BasePage.js'
import SignUpPage from '../framework/pages/SignUpPage.js'

const basePage = new BasePage()
const loginPage = new LoginPage()
const signUpPage = new SignUpPage()
describe('login/logout tests', () => {
  let browser, context, page

  beforeEach(async () => {
    browser = await chromium.launch({ headless: false })
    context = await browser.newContext()
    page = await context.newPage()
  })

  afterEach(async () => {
    await browser.close()
  })

  it('should create user', async () => {
    await page.goto(siteMap.pages.basePage)
    expect(await page.title()).to.equal('Automation Exercise')
    await page.click(basePage.selectors.signUpBtn)
    expect(await page.textContent(LoginPage.selectors.signUpForm)).to.include('New User Signup!')
    await loginPage.functions.fillSignUsForm(page)
    expect(await page.textContent(LoginPage.selectors.accInfoBlock)).to.include('Enter Account Information')
    expect(await page.$eval(SignUpPage.selectors.nameRegField, (element) => element.value)).to.include(user.firstName)
    expect(await page.$eval(SignUpPage.selectors.emailRegField, (element) => element.value)).to.include(user.email)
    await signUpPage.functions.fillAccForm(page)
    expect(await page.textContent(SignUpPage.selectors.accCreateHeader)).to.include('Account Created!')
    await page.click(SignUpPage.selectors.continueBtn)
    expect(await page.textContent('div.shop-menu li:last-child')).to.include(`Logged in as ${user.firstName}`)
  })
})
