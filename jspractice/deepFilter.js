const deepFilter = (obj, filterFn) => {
  for (let key in obj) {
    const val = obj[key]

    if (val && typeof val === 'object' && !Array.isArray(val)) {
      // null is an object in js
      deepFilter(val, filter) // recusrvie dfs call on the value
    } else {
      if (!filterFn(val)) {
        delete obj[key]
      }
    }

    if (JSON.stringify(val) === '{}') {
      // if all the children are deleted, then the parent must be deleted
      delete obj[key]
    }
  }
}

const filter = (s) => typeof s === 'string'
const obj = {
  a: 1,
  b: {
    c: 'Hello World',
    d: 2,
    e: {
      f: {
        g: -4,
      },
    },
    h: { obj: 'I am obj' },
  },
}
deepFilter(obj, filter)
console.log(obj)
