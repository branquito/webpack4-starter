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
  range: {
    type: 'select',
    model: 'user.team.selected',
    options: 'user.team.options'
  },
  range2: {
    type: 'dropdown',
    model: 'user.timeline.selected',
    options: 'user.timeline.options'
  },
  timeline: {
    type: 'select',
    model: 'user.timeline.selected',
    options: 'user.timeline.options'
  },
  test: {
    type: 'button',
    inputType: 'submit',
    text: 'Click me!',
    action: 'clickAction'
  }
}
