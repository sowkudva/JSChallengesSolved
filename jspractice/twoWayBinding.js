// basic question - 45 mins - sadanand pai

// js polyfils -

// Array - map, reduce & filter

// lodash funcs -> debouce, throttle, flatten curry, clone Deep

// Function.prototype.bind, call & apply

// Data structure questions

// api calls to get latest blogs using auth

// batch processing of promises - tiktok's

// const { JSDOM } = require('jsdom')
// // Create a virtual DOM
// const { window } = new JSDOM(`<!DOCTYPE html><body></body>`)
// const { document } = window

/* please create a function model(state, element) to bind state.value to the HTLInputElement element. */
/* two way binding problem in js */
function model(state, element) {
  // initialize
  element.value = state.value

  Object.defineProperty(state, 'value', {
    get() {
      return element.value
    },
    set(newValue) {
      element.value = newValue
    },
    configurable: true,
  })
  element.addEventListener('change', () => {
    state.value = element.value
  })
}
const input = document.createElement('input')
const state = { value: 'hi' } // object

model(state, input)
console.log(input.value) // hi

state.value = 'dev'
console.log(input.value) // dev

input.value = 'engineeringchirag'
input.dispatchEvent(new Event('change'))
console.log(state.value)
