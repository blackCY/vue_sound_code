/* 观察者模式 */
class Subject {
  private static instance: Subject
  private observers: any[]

  constructor() {
    this.observers = []
  }

  public static init() {
    if (!Subject.instance) {
      Subject.instance = new Subject()
    }

    return Subject.instance
  }

  public addObserver(observer) {
    this.observers.push(observer)
  }

  public cancelObserver(observer) {
    this.observers = this.observers.filter((item) => item !== observer)
  }

  public notify() {
    this.observers.forEach((observer) => observer.update())
  }
}

const subject = Subject.init()

class Observer {
  name: string

  constructor(name: string) {
    this.name = name
  }

  update() {
    console.log(`this.name -----> ${this.name}`)
  }
}

const observer1 = new Observer('zhangsan')
const observer2 = new Observer('lisi')

subject.addObserver(observer1)
subject.addObserver(observer2)

subject.notify()

/* 发布订阅模式 */
class Schedule {
  private products: object

  constructor() {
    this.products = {}
  }

  subscriberProduct(name, cb) {
    if (!this.products[name]) this.products[name] = []
    this.products[name].push(cb)
  }

  publishProduct(...args) {
    const name = Array.prototype.shift.call(args)
    const cbs = this.products[name]

    if (!cbs || cbs.length === 0) return
    cbs.forEach((cb) => cb.apply(this, args))
  }

  cancelSubscriberProduct(name) {
    delete this.products[name]
  }
}

const schedule = new Schedule()

schedule.subscriberProduct('iphone', (time) => {
  console.log(`手机店关注了新款iphone发布时间为 ${time}`)
})

schedule.subscriberProduct('iphone', (time) => {
  console.log(`个人关注了新款iphone发布时间为 ${time}`)
})

schedule.subscriberProduct('macbookPro', (sales) => {
  console.log(`macbookPro正在促销 促销价为 ￥${sales}`)
})

schedule.publishProduct('iphone', '2020-09-09')
schedule.publishProduct('macbookPro', '2029-09-09')
