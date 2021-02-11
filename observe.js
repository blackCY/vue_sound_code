import Dep from './Dep'

function defineReactive(obj, key, val) {
  // 这里通过闭包保存了 dep 对象
  const dep = new Dep()

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      /* 将 Dep.target，即当前的 Watcher 对象存入 Dep 的 subscribes 中 */
      dep.register(Dep.target)

      // 将 Dep.target 的引用置为空
      Dep.target = null

      return val
    },
    set(newVal) {
      if (val === newVal) return

      /* 在 set 的时候触发 Dep 的 notify 来通知所有的 Watcher 对象更新视图 */
      dep.notify()
    }
  })
}

export default defineReactive
