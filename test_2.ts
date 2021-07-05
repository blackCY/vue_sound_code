/**
 * 观察者模式
 * 观察者模式指的是一个对象 Subject 维持着一系列依赖于它的对象 Observer，当有状态发生改变时 Subject 则通知一系列 Observer 进行更新
 * 在观察者模式中，Subject 拥有添加、删除以及通知一系列 Observer 的方法等等，而 Observer 对象每个都拥有自己的更新函数，用于处理更新时的逻辑
 * 
 * 优点：观察者模式满足 开闭原则，主题接口仅仅依赖于观察者接口，这样，就可以让创建具体主题的类也仅仅依赖于观察者接口，因此，如果增加新的实现观察者接口的类，不必修改创建具体主题的类的代码，同样，创建具体观察者的类仅仅依赖于主题接口，如果增加新的实现主题接口的类，也不必修改创建具体观察者类的代码
 * 
 * 缺点：如果在观察者和观察目标之间有循环依赖的话，观察目标触发它们之间进行循环调用(如果上面 Observer 也是一个观察目标)，可能导致系统崩溃。观察者模式没有相应的机制让观察者知道所观察的目标是怎么发生变化的，而仅仅只是知道观察目标发生了变化
 *
 * @class Subject_2
 */
class Subject_2 {
  observers;

  constructor() {
    this.observers = [];
  }

  add(observer) {
    this.observers.push(observer);
  }

  notify() {
    this.observers.forEach(observer => {
      observer.update();
    });
  }

  remove(observer) {
    this.observers = this.observers.filter(item => item !== observer);
  }
}

class Observer_2 {
  name;

  constructor(name) {
    this.name = name;
  }

  update() {
    console.log(this.name);
  }
}

const subject_2 = new Subject_2();
const observer_1 = new Observer_2('observer_1');
const observer_2 = new Observer_2('observer_2');
subject_2.add(observer_1);
subject_2.add(observer_2);

subject_2.notify();

/**
 * 发布-订阅模式
 * 发布-订阅模式用来作为一个调度中心，一个吧发布者和订阅者架接在一起的代理。发布者是当完成某些过程或者发布一个产品的时候出发事件的对象，订阅者是希望当发布者发布的时候希望被通知的对象
 * 
 * 优点：对象之间的解耦，在异步编程里可以更松耦合的方式组织代码结构，更具灵活性，不需要关系中间过程是如何实现的，只需要发布者和订阅者共同遵守一份协议
 * 
 * 缺点：与观察者模式一样如果有循环依赖同样可能会造成系统崩溃，其次创建订阅者本身需要消耗一定的时间和内存，本身 products 对象也是一个缓存列表
 *
 * @class Schedule_2
 */
class Schedule_2 {
  products;

  constructor() {
    this.products = {};
  }

  subscriberProduct(name, cb) {
    if (!this.products[name]) this.products[name] = [];
    this.products[name].push(cb);
  }

  publishProduct(...args) {
    const name = Array.prototype.shift.call(args);
    const cbs = this.products[name];

    if (!cbs || cbs.length === 0) return;

    cbs.forEach(cb => cb.apply(this, args));
  }

  cancelProduct(name) {
    delete this.products[name];
  }

  removeProduct(name, cb) {
    this.products[name] = this.products[name].filter(item => item !== cb);
  }
}

const schedule_2 = new Schedule_2();

schedule_2.subscriberProduct('iphone', time => {
  console.log(`iphone新品发布时间为：${time}`);
});
schedule_2.subscriberProduct('iphone', time => {
  console.log(`iphone新品发布时间为：${time}`);
});
schedule_2.subscriberProduct('macbook', time => {
  console.log(`macbook新品发布时间为：${time}`);
});

schedule_2.publishProduct('iphone', '2021-05-22');
