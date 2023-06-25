import UserCreator from '../fixture/UserCreator.js'
const userCreator = new UserCreator()

export let user = ''
export default class LoginPage {
  static selectors = {
    signUpForm: 'div[class="signup-form"]',
    nameField: 'input[data-qa="signup-name"]',
    emailField: 'input[data-qa="signup-email"]',
    signUpBtn: 'button[data-qa="signup-button"]',
    loginForm: 'div[class="login-form"]',
    emailLogField: 'input[data-qa="login-email"]',
    passLogField: 'input[data-qa="login-password"]',
    loginBtn: 'button[data-qa="login-button"]'
  }

  functions = {

    async fillSignUsForm (page) {
      user = await userCreator.createUser()
      await page.fill(LoginPage.selectors.nameField, user.firstName)
      await page.fill(LoginPage.selectors.emailField, user.email)
      await page.click(LoginPage.selectors.signUpBtn)
    },

    async fillLoginUsForm (page) {
      await page.fill(LoginPage.selectors.emailLogField, user.email)
      await page.fill(LoginPage.selectors.passLogField, user.userPass)
      await page.click(LoginPage.selectors.loginBtn)
    }
  }
}
