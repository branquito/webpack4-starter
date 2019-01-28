export default {
  rangeMulti: {
    type: "select",
    inputType: "multiple",
    model: "breeds.selected",
    options: "breeds.options"
  },
  test: {
    type: "button",
    inputType: "submit",
    text: "Click me!",
    action: "clickAction"
  }
}
