const fetchWithTimeout = async (url, waitTime) => {
  const controller = new AbortController()
  const signal = controller.signal
  let timer = null

  //set up timer to abort request if timer expires
  timer = setTimeout(() => {
    console.log('Aborted')
    controller.abort()
  }, waitTime)

  try {
    let resp = await fetch(url, { signal })

    // should clear the timer if resp is received within the waitTime
    clearTimeout(timer)

    resp = await resp.json()
    return resp
  } catch (err) {
    if (err.name === 'AbortError') {
      console.log('Fetch Aborted')
    } else {
      console.log('error in api calling')
    }
    throw err // rethrow the the error for the caller to handle
  }
}

fetchWithTimeout('https://jsonplaceholder.typicode.com/todos/1', 5)
  .then((res) => console.log(res))
  .catch((e) => console.log('abort err print', e.message))
// error object contains e.name, e.message, e.stack
