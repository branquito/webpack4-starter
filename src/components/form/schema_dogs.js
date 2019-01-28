export default {
  rangeMulti: {
    type: 'select',
    inputType: 'multiple',
    model: 'breeds.multiSelectValue',
    options: 'breeds.options'
  },
  test: {
    type: 'button',
    inputType: 'submit',
    text: 'Click me!',
    action: 'clickAction'
  }
}
