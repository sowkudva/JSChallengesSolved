function debounce(func, wait) {
  let timer = null

  return function (...args) {
    const context = this

    if (timer !== null) {
      console.log('clearing')
      clearTimeout(timer)
    }

    timer = setTimeout(function () {
      timer = null

      func.call(context, ...args)
    }, wait)
  }
}

// const increment = debounce(() => {
//   console.log('executing')
// }, 5000) // this just gets the returned function
// increment() // first execution of function, timer is null, schdules the callback function execution
// increment() // second call, timer is not null, so prints clearing and schedules another timer by overriding old one
// increment() // third call, times is not null, sp prints clearing and schedules another timer by overriding old one

// since no more calls, timer has expired, so the schduled callback executes and prints 'executing'

function incrementCounterCallBack(inc) {
  let originc = inc

  return function () {
    originc++
    console.log(originc)
  }
}

let resp = debounce(incrementCounterCallBack(0), 100)

setTimeout(() => resp(), 200)
setTimeout(() => resp(), 400)
setTimeout(() => resp(), 600)
setTimeout(() => resp(), 800)
