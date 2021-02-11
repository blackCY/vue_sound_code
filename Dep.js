/* 订阅者 */
class Dep {
  constructor() {
    this.subscribes = []
  }

  // Observer 的订阅
  register(observer) {
    this.subscribes.push(observer)
  }

  // Observer 触发更新
  notify() {
    this.subscribes.forEach((subscribe) => subscribe.update())
  }

  remove(observer) {
    this.subscribes = this.subscribes.filter(
      (subscribe) => subscribe !== observer
    )
  }
}

export default Dep
