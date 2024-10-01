// SDK analytics - 30 mins
// https://learnersbucket.com/examples/interview/create-analytics-sdk-in-javascript/

/* Taks
1) Create a analytics SDK that exposes LogEvent, 
2) It takes in events and queues them
3) implement a stub function that resolves in 1 second and fails for every n%5 th call
4) implement sendAnalytics functions 
5) retry the failed event and send the next event only after the succss of previous event*/

// constructure function

class SDK {
  constructor() {
    this.logs = []
    this.count = 1

    this.log = (event) => {
      this.logs.push(event)
    }

    this.wait = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (this.count % 3 === 0) {
            reject()
          } else {
            resolve()
          }
        }, 1000)
      })
    }

    this.sendAnalytics = async () => {
      // base
      if (this.logs.length === 0) return

      let current = this.logs.shift() // get first event

      try {
        await this.wait()
        console.log('Logged: ', current)
        this.count++
      } catch (err) {
        console.log('-----')
        console.log('Event Failed', current)
        console.log('Retrying event:', current)

        this.count = 1
        this.logs.unshift(current) // push to the front of the logs
      } finally {
        this.sendAnalytics()
      }
    }
  }
}

const sdk = new SDK()
sdk.log('Event 1')
sdk.log('Event 2')
sdk.log('Event 3')
sdk.log('Event 4')
sdk.log('Event 5')
sdk.log('Event 6')
sdk.sendAnalytics()
