import defineReactive from './observe'

function observer(data) {
  if (!data || typeof data !== 'object') return

  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key])
  })
}

export default observer
