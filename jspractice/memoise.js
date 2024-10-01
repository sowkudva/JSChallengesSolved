const add = (a, b) => a + b

const memoizeOne = (fn) => {
  // do something
  let cache = {}

  return (...args) => {
    const key = JSON.stringify(args)
    if (cache[key] === undefined) {
      console.log('calling add')
      const value = add(...args)
      cache[key] = value
    }

    return cache[key]
  }
}

const momoizeAdd = memoizeOne(add)

console.log(momoizeAdd(1, 2)) // return 3
console.log(momoizeAdd(1, 2)) // return 3 -- returns from the cache
console.log(momoizeAdd(3, 2)) // return 5
console.log(momoizeAdd(3, 2)) // return 5 -- returns from cachec
