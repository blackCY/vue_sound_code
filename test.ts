/* 观察者模式 */
interface IObserver {
  update(): void
}

interface IAbstractSubject {
  registerObserver(observer: IObserver): void
  remove(observer: IObserver): void
  notifyObservers(): void
}

class ConcreteSubject implements IAbstractSubject {
  private observers: Array<IObserver>

  constructor() {
    this.observers = []
  }

  registerObserver(observer) {
    this.observers.push(observer)
  }

  remove(observer) {
    this.observers = this.observers.filter((item) => item !== observer)
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer.update())
  }
}

class ConcreteObserver implements IObserver {
  constructor(private val: string) {
    this.val = val
  }

  update() {
    console.log(`已经执行更新操作，值为------------> ${this.val}`)
  }
}

const concreteSubject = new ConcreteSubject()
const observer_1: IObserver = new ConcreteObserver('value1')
const observer_2: IObserver = new ConcreteObserver('value2')

concreteSubject.registerObserver(observer_1)
concreteSubject.registerObserver(observer_2)
concreteSubject.notifyObservers()

/* 发布订阅模式 */

interface Subscribe {
  update(...agrs): void
}

interface Publish {
  registerObserver(eventType: string, subscribe: Subscribe): void
  // 这里变成可传入的，说明可以对整个调度中心进行删除
  remove(eventType: string, subscribe?: Subscribe): void
  notifyObserver(eventType: string): void
}

interface SubscribeObject {
  [key: string]: Array<Subscribe>
}

class ConcretePublish implements Publish {
  private subscribes: SubscribeObject

  constructor() {
    this.subscribes = {}
  }

  registerObserver(eventType, subscribe) {
    if (!this.subscribes[eventType]) {
      this.subscribes[eventType] = []
    }
    this.subscribes[eventType].push(subscribe)
  }

  remove(eventType, subscribe) {
    if (!subscribe) {
      // 删除整个调度中心
      delete this.subscribes[eventType]
    } else {
      this.subscribes[eventType] = this.subscribes[eventType].filter(
        (item) => item !== subscribe
      )
    }
  }

  notifyObserver(eventType, ...args) {
    const subscribes = this.subscribes[eventType]

    subscribes && subscribes.forEach((subscribe) => subscribe.update(...args))
  }
}

class ConcreteSubscriber1 implements Subscribe {
  update(...value: any[]): void {
    console.log('已经执行更新操作1，值为', ...value)
  }
}

class ConcreteSubscriber2 implements Subscribe {
  update(...value: any[]): void {
    console.log('已经执行更新操作1，值为', ...value)
  }
}

const publish = new ConcretePublish()
const subscribe1 = new ConcreteSubscriber1()
const subscribe2 = new ConcreteSubscriber2()
publish.registerObserver('a', subscribe1)
publish.registerObserver('b', subscribe2)
publish.notifyObserver('a', '22222')
