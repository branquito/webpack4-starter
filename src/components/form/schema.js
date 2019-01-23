export default {
  name: {
    type: 'input',
    model: 'user.name',
    label: 'Your name:'
  },
  pin: {
    type: 'input',
    inputType: 'password',
    model: 'user.pass',
    label: 'Your password:'
  },
  age: {
    type: 'input',
    model: 'user.age',
    label: 'Your age:'
  },
  submit: {
    type: 'button',
    text: 'Click me!'
  }
}
