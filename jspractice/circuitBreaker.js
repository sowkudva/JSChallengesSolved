/* intention 
some function is executed for few times
if it fails for x times, then we need to close the service for y duration 

https://learnersbucket.com/examples/interview/circuit-breaker-in-javascript/
*/

function circuitrBreaker(fn, failureThreshhold, timeToHalt) {
  let failures = 0
  let timeOfLastFailure = 0
  let isClosed = false

  // this function to return a function
  return (...args) => {
    if (isClosed) {
      let diff = Date.now() - timeOfLastFailure

      if (diff >= timeToHalt) {
        isClosed = false
      } else {
        console.log('Service is currently unavailbale')
        return
      }
    }

    try {
      let result = fn(...args)
      failures = 0
      return result
    } catch (error) {
      failures++
      timeOfLastFailure = Date.now()

      if (failures >= failureThreshhold) {
        isClosed = true
      }
      console.log('error')
    }
  }
}

const add = (...args) => {
  let sum = args.reduce((a, b) => a + b, 0)
  return sum
}

const testFn = () => {
  let count = 0

  return (...args) => {
    count++

    if (count < 4) {
      throw 'Error'
    } else {
      return `sum is =>, ${add(...args)}`
    }
  }
}

const fn = testFn()

const c = circuitrBreaker(fn, 3, 1000)
c(1, 2)
c(1, 2)
c(1, 2)
c(1, 2)
c(1, 2)
c(1, 2)
c(1, 2)
c(1, 2)
setTimeout(() => console.log(c(1, 2, 6)), 1200)
