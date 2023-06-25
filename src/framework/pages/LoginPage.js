import UserCreator from '../fixture/UserCreator.js'
const userCreator = new UserCreator()

export let user = ''
export default class LoginPage {
  static selectors = {
    signUpForm: 'div[class="signup-form"]',
    nameField: 'input[data-qa="signup-name"]',
    emailField: 'input[data-qa="signup-email"]',
    signUpBtn: 'button[data-qa="signup-button"]',
    regUsForm: 'div[class="login-form"]',
    accInfoBlock: 'div[class="login-form"]',
    titleRad: 'input[value="Mr"]',
    nameRegField: 'input[data-qa="signup-name"]',
    emailRegField: 'input[data-qa="signup-email"]',
    passRegField: 'input[data-qa="password"]',
    dateRegField: 'select[data-qa="days"]',
    monthRegField: 'select[data-qa="months"]',
    yearRegField: 'select[data-qa="years"]',
    newsCheckBox: 'input[name="newsletter"]',
    specCheckBox: 'input[name="optin"]'
  }

  functions = {

    async fillSignUsForm (page) {
      user = await userCreator.createUser()
      await page.fill(LoginPage.selectors.nameField, user.firstName)
      await page.fill(LoginPage.selectors.emailField, user.email)
      await page.click(LoginPage.selectors.signUpBtn)
    }
  }
}
