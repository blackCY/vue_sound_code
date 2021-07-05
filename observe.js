function defineReactive(data, key, val) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      return val
    },
    set(newVal) {
      console.log(newVal)
      if (val === newVal) return

      cb(newVal)
    }
  })
}

function cb(val) {
  /* 渲染视图 */
  console.log('视图更新啦------------------')
}

export default defineReactive
