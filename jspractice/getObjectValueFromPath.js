const get = (obj, path) => {
  path = path.replaceAll('[', '.')
  path = path.replaceAll(']', '')

  let keys = path.split('.').filter(Boolean)

  let current = obj
  for (let key of keys) {
    current = current[key]

    if (current === undefined) return undefined
  }
  return current
}

console.log(get({ developer: 'Software Engineer' }, 'developer')) // => 'Software Engineer'

const param = [{ developer: 'Tom' }, { count: [0, 1] }]
console.log(get(param, '[1].count[0]')) //=>0

const param2 = { developer: { firstName: 'Tom', lastName: 'Cruz' } }
console.log(get(param2, 'developer.lastName')) //=>'Cruz

const param4 = [{ developer: 'Tom' }, [0, null]]
console.log(get(param4, '[1][1]')) //=>null
console.log(get(param4, '[1][3]')) //=>undefined
