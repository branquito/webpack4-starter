export default {
  name: {
    type: "input",
    model: "user.name",
    label: "Name"
  },
  pin: {
    type: "input",
    inputType: "password",
    model: "user.pass",
    label: "Password"
  },
  age: {
    type: "input",
    model: "user.age",
    label: "Age"
  },
  submit: {
    type: "button"
  }
}
