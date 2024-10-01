const a = [1, 2, 3, [4, [5, 6]], 7, 8]
const flatten = (arr, res) => {
  arr.forEach((element) => {
    if (Array.isArray(element)) {
      flatten(element, res)
    } else res.push(element)
  })

  return res
}

const result = flatten(a, [])
console.log(result)
