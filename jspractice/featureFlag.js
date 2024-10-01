/*https://devtools.tech/questions/how-to-implement-feature-flag-functionality-atlassian-frontend-interview-question/submissions/Ir7Hz7x3DoZqU5Nce9Sr?ref=item-card */

const SAMPLE_FEATURES = {
  show_new_dialog: true,
  enable_new_pricing: true,
}

// simulate API calls
const getAllFeatureFlags = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(SAMPLE_FEATURES), 1000)
  })
}

let cache = {
  features: null,
  timestamp: 0,
}

const TTL = 60000

const getFeatureFlag = async (featureName, defaultVal) => {
  const now = Date.now()

  if (cache.features && now - cache.timestamp < TTL) {
    // data still fresh
    console.log('returning from cache')
    return cache.features[featureName] ?? defaultVal
  }

  try {
    let features = await getAllFeatureFlags()
    cache.features = features
    cache.timestamp = Date.now()
  } catch (err) {
    console.log('error fetching from api')
    return defaultVal
  }

  return cache.features[featureName] ?? defaultVal
}

getFeatureFlag('show_new_dialog', false)
  .then((res) => {
    if (res) console.log('Showing dialog feature')
    else console.log('No dialog, old functionality')
  })
  .catch((e) => console.log(e))

setTimeout(() => {
  getFeatureFlag('show_new_dialog', false)
    .then((res) => {
      if (res) console.log('Showing dialog feature')
      else console.log('No dialog, old functionality')
    })
    .catch((e) => console.log(e))
}, 2000)
