import Dep from './Dep'
import defineReactive from './observe'

/* 观察者 */
export class Watcher {
  constructor() {
    // 在 new 一个 Observer 对象时将该对象赋值给 Dep.target，在 get 中会用到
    Dep.target = this
  }

  update() {
    console.log('111')
  }
}

export function observer(data) {
  if (data === null || typeof data !== 'object') return

  Object.keys(data).forEach((key) => defineReactive(data, key, data[key]))
}
