function cb(val) {
  /* 渲染视图 */
  console.log('视图更新啦～')
}

function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      return val
    },
    set(newVal) {
      if (val === newVal) return
      cb(newVal)
    }
  })
}

function observer(data) {
  if (data === null || typeof data !== 'object') return

  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key])
  })
}

class Vue {
  constructor(options) {
    this._data = options.data
    observer(this._data)
  }
}

let o = new Vue({
  data: {
    test: 'I am test.'
  }
})

o._data.test = 'hello,world.' /* 视图更新啦～ */
