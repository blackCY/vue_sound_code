/* 订阅者 */
class Dep {
  constructor() {
    this.subscribes = []
  }

  register(observer) {
    this.subscribes.push(observer)
  }

  remove(observer) {
    this.subscribes = this.subscribes.filter(
      (subscribe) => subscribe !== observer
    )
  }

  notify() {
    this.subscribes.forEach((subscribe) => subscribe.update(...args))
  }
}
