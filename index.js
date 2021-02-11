import { Watcher, observer } from './observer'

class Vue {
  constructor(options) {
    this._data = options.data
    // 新建一个观察者，这时候 Dep.target 会指向这个观察者
    new Watcher()

    observer(this._data)

    console.log('~~~render')
  }
}

let o = new Vue({
  data: {
    test: 'I am test.',
    a: 1
  }
})

console.log(o._data.test)

o._data.test = 'hello,world.'

console.log(o._data.test)

console.log(o._data.a)
