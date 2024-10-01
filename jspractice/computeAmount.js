const computeAmount = () => {
  let total = 0

  return {
    lacs: function (val) {
      total += val * 100000
      return this
    },
    crore: function (val) {
      total += val * 10000000
      return this
    },
    thousand: function (val) {
      total += val * 1000
      return this // u have to do this to chain the subsequent function calls
    },
    value: () => {
      return total
    },
  }
}

console.log(
  computeAmount()
    .lacs(15)
    .crore(5)
    .crore(2)
    .lacs(20)
    .thousand(45)
    .crore(7)
    .value()
) //143545000
