import { user } from './LoginPage.js'

export default class SignUpPage {
  static selectors = {
    accInfoBlock: 'div[class="login-form"]',
    titleRad: '.radio-inline',
    nameRegField: 'input[data-qa="name"]',
    emailRegField: 'input[data-qa="email"]',
    passRegField: 'input[data-qa="password"]',
    dateRegField: 'select[data-qa="days"]',
    monthRegField: 'select[data-qa="months"]',
    yearRegField: 'select[data-qa="years"]',
    newsCheckBox: 'input[name="newsletter"]',
    specCheckBox: 'input[name="optin"]',
    firstNameField: 'input[data-qa="first_name"]',
    lastNameField: 'input[data-qa="last_name"]',
    companyField: 'input[data-qa="company"]',
    addressField: 'input[data-qa="address"]',
    address2Field: 'input[data-qa="address2"]',
    countryField: 'select[data-qa="country"]',
    stateField: 'input[data-qa="state"]',
    cityField: 'input[data-qa="city"]',
    zipCodeField: 'input[data-qa="zipcode"]',
    mobileNumField: 'input[data-qa="mobile_number"]',
    createAccBtn: 'button[data-qa="create-account"]',
    accCreateHeader: 'h2[data-qa="account-created"]',
    continueBtn: 'a[data-qa="continue-button"]'
  }

  functions = {

    async fillAccForm (page) {
      await page.click(SignUpPage.selectors.titleRad)
      await page.type(SignUpPage.selectors.passRegField, user.userPass)
      await page.click(SignUpPage.selectors.dateRegField)
      await page.type(SignUpPage.selectors.dateRegField, '16')
      await page.type(SignUpPage.selectors.monthRegField, 'March')
      await page.type(SignUpPage.selectors.yearRegField, '1975')
      await page.click(SignUpPage.selectors.newsCheckBox)
      await page.click(SignUpPage.selectors.specCheckBox)
      await page.type(SignUpPage.selectors.firstNameField, user.firstName)
      await page.type(SignUpPage.selectors.lastNameField, user.lastName)
      await page.type(SignUpPage.selectors.companyField, user.companyName)
      await page.type(SignUpPage.selectors.addressField, user.address)
      await page.type(SignUpPage.selectors.address2Field, user.secAddress)
      await page.selectOption(SignUpPage.selectors.countryField, 'Australia')
      await page.type(SignUpPage.selectors.stateField, user.state)
      await page.type(SignUpPage.selectors.cityField, user.city)
      await page.type(SignUpPage.selectors.zipCodeField, user.zipCode)
      await page.type(SignUpPage.selectors.mobileNumField, user.phone)
      await page.click(SignUpPage.selectors.createAccBtn)
    }
  }
}
