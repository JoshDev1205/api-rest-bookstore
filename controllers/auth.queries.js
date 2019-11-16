const createUser = `
  mutation createUser ($email: String!, $password: String!) {
    createUser(
      data: {
        email: $email,
        password: $password
      }
    ){
      _id
    }
  }
`

const findUserByEmail = `
  query findUserByEmail ($email: String!) {
    findUserByEmail (
      email: $email
    ) {
     data {
        _id
      email
      password
     }
    }
  }
`

module.exports = {
  createUser,
  findUserByEmail
}