let names = [
  'Alia',
  'Amanda',
  'Bob',
  'Brian',
  'Bui',
  'Catherine',
  'Cat',
  'Cathey',
  'Dave',
  'Dijstra',
  'England',
  'Emily',
  'Fin',
  'Ganesh',
  'Hoffman',
  'Iver',
  'Jack',
  'Zach',
  'Gianne',
  'Raj',
  'Sowmya',
  'Mira',
  'Natalie',
  'Sumedha',
  'Sneha',
  'Komal',
  'Poorva',
  'Kuldeep',
  'Swathi',
  'Sindhu',
  'Kiran',
]

let sorted = names.sort()
console.log(sorted)

const input = document.getElementById('input-box')
input.addEventListener('keyup', (e) => {
  let typedValue = input.value.toLowerCase()
  removeElements()

  for (let name of sorted) {
    if (name.toLowerCase().startsWith(typedValue) && typedValue !== '') {
      let listItem = document.createElement('li')
      listItem.classList.add('list-items')
      listItem.style.cursor = 'pointer'
      listItem.addEventListener('click', () => {
        displayNames(' ' + name + ' ')
      })
      let word =
        name.substring(0, input.value.length) +
        name.substring(input.value.length)
      listItem.textContent = word
      document.querySelector('.list').appendChild(listItem)
    }
  }
})

const removeElements = () => {
  const items = document.querySelectorAll('.list-items')
  items.forEach((item) => item.remove())
}

const displayNames = (val) => {
  input.value = val
  removeElements()
}

console.log('hello')
