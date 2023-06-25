import faker from 'faker'

export default class UserCreator {
  async createUser () {
    const firstName = faker.name.firstName()
    const email = faker.internet.email()
    const userPass = faker.internet.password()
    const lastName = faker.name.lastName()
    const companyName = faker.animal.cetacean()
    const address = faker.address.streetAddress()
    const secAddress = faker.address.secondaryAddress()
    const state = faker.address.state()
    const city = faker.address.city()
    const zipCode = faker.address.zipCode()
    const phone = faker.fake('{{phone.phoneNumber}}')
    return { firstName, email, userPass, lastName, companyName, address, secAddress, phone, state, city, zipCode }
  }
}
