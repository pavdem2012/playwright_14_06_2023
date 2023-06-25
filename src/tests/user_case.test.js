import siteMap from '../framework/config/siteMap.js'
import LoginPage, {user} from '../framework/pages/LoginPage.js'
import {expect} from 'chai'
import {chromium} from 'playwright'
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
    await page.goto(siteMap.pages.basePage)
  })

  afterEach(async () => {
    await browser.close()
  })


  it('should create user', async () => {
    expect(page.url()).to.equal(siteMap.pages.basePage)
    expect(await page.title()).to.equal('Automation Exercise')
    await page.click(basePage.selectors.signUpBtn)
    expect(await page.url()).to.equal(siteMap.pages.loginPage)
    expect(await page.textContent(LoginPage.selectors.signUpForm)).to.include('New User Signup!')
    await loginPage.functions.fillSignUsForm(page)
    expect(await page.url()).to.equal(siteMap.pages.signUpPage)
    expect(await page.textContent(SignUpPage.selectors.accInfoBlock)).to.include('Enter Account Information')
    expect(await page.$eval(SignUpPage.selectors.nameRegField, (element) => element.value)).to.include(user.firstName)
    expect(await page.$eval(SignUpPage.selectors.emailRegField, (element) => element.value)).to.include(user.email)
    await signUpPage.functions.fillAccForm(page)
    expect(await page.textContent(SignUpPage.selectors.accCreateHeader)).to.include('Account Created!')
    await page.click(SignUpPage.selectors.continueBtn)
    expect(await page.url()).to.equal(siteMap.pages.basePage)
    expect(await page.textContent(basePage.selectors.loggedBy)).to.include(`Logged in as ${user.firstName}`)
  })

  it('should login/logout user', async () =>{
    await page.click(basePage.selectors.signUpBtn)
    expect(await page.url()).to.equal(siteMap.pages.loginPage)
    expect(await page.textContent(LoginPage.selectors.loginForm)).to.include('Login to your account')
    await loginPage.functions.fillLoginUsForm(page)
    expect(await page.url()).to.equal(siteMap.pages.basePage)
    expect(await page.textContent(basePage.selectors.loggedBy)).to.include(`Logged in as ${user.firstName}`)
    await page.click(basePage.selectors.logoutBtn)
    expect(await page.url()).to.equal(siteMap.pages.loginPage)
  });

  it("failed to login with wrong credentials", async () => {
    await page.click(basePage.selectors.signUpBtn)
    expect(await page.url()).to.equal(siteMap.pages.loginPage)
    expect(await page.textContent(LoginPage.selectors.signUpForm)).to.include('New User Signup!')
    await page.fill(LoginPage.selectors.emailLogField, user.email)
    await page.fill(LoginPage.selectors.passLogField, user.email)
    await page.click(LoginPage.selectors.loginBtn)
    let text=await page.evaluate(() => {
      let element = document.querySelector('p[style="color: red;"]');
      return element.textContent || element.innerText || element.firstChild.nodeValue
    });
    expect(text).to.include("Your email or password is incorrect!");
    expect(await page.url()).to.equal(siteMap.pages.loginPage)

  });

  it('failed to register with exiting eMail ', async () =>{
    await page.click(basePage.selectors.signUpBtn)
    expect(await page.url()).to.equal(siteMap.pages.loginPage)
    expect(await page.textContent(LoginPage.selectors.signUpForm)).to.include('New User Signup!')
    await page.fill(LoginPage.selectors.nameField,"Error")
    await page.fill(LoginPage.selectors.emailField, user.email)
    await page.click(LoginPage.selectors.signUpBtn)
    let text=await page.evaluate(() => {
      let element = document.querySelector('p[style="color: red;"]');
      return element.textContent || element.innerText || element.firstChild.nodeValue
    });
    expect(text).to.include("Email Address already exist!");
    expect(await page.url()).to.equal(siteMap.pages.signUpPage)
  });


  it('should login/delete user', async () =>{
    await page.click(basePage.selectors.signUpBtn)
    expect(await page.url()).to.equal(siteMap.pages.loginPage)
    expect(await page.textContent(LoginPage.selectors.loginForm)).to.include('Login to your account')
    await loginPage.functions.fillLoginUsForm(page)
    expect(await page.url()).to.equal(siteMap.pages.basePage)
    expect(await page.textContent(basePage.selectors.loggedBy)).to.include(`Logged in as ${user.firstName}`)
    await page.click(basePage.selectors.deleteAccBtn)
    expect(await page.url()).to.equal(siteMap.pages.accDeletePage)
    expect(await page.textContent(SignUpPage.selectors.accDeleteHeader)).to.include('Account Deleted!')
    await page.click(SignUpPage.selectors.continueBtn)
    expect(await page.url()).to.equal(siteMap.pages.basePage)
  });
})
