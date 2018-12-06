import style from "./main.css"

console.log("I am dummy entry point")

const arr = [1, 2, 3, 4, 5]

const f = () => console.log(...arr)

window.f = f
