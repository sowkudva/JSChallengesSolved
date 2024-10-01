//https://www.youtube.com/watch?v=3jrfDk9k8rY
// problem : cache the API call response

const cachedApi = (time) => {
  const cache = {} // closure

  return async (url, config = {}) => {
    // async functions return a promise by default
    const key = `${url}${JSON.stringify(config)}`

    const entry = cache[key]

    if (!entry || Date.now() > entry.expiry) {
      console.log('making fresh api call')
      try {
        let resp = await fetch(url, config)
        resp = await resp.json()
        cache[key] = { value: resp, expiry: Date.now() + time }
      } catch (e) {
        console.log('error in calling api')
      }
    }

    return cache[key].value
  }
}

const call = cachedApi(1500)
call('https://jsonplaceholder.typicode.com/todos/1').then((res) =>
  console.log(res)
)

setTimeout(
  () =>
    call('https://jsonplaceholder.typicode.com/todos/1').then((res) =>
      console.log(res)
    ),
  1000
)
