import observer from './observer'

class Vue {
  constructor(options) {
    this._data = options.data

    observer(this._data)
  }
}

const vm = new Vue({
  data: {
    a: [1, 2, 3]
  }
})

vm._data.a = [4, 5, 6]
