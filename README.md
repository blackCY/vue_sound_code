# Vue.js 2.5.15-beta.0

## 目录

- [Introduction](#Introduction)
- - [Vue.js 技术揭秘](#Vue.js技术揭秘)
- - [章节⽬录](#章节⽬录)

- [准备⼯作](#准备⼯作)
- - [认识 FLow](#认识FLow)
- - [Vue.js 源码⽬录设计](#Vue.js源码⽬录设计)
- - [Vue.js 源码构建](#Vue.js源码构建)
- - [从⼊⼝开始](#从⼊⼝开始)

- [数据驱动](#数据驱动)
- - [new Vue 发生了什么](#newVue发生了什么)
- - [Vue 实例挂载的实现](#实例挂载的实现)
- - [render](#render)
- - [Virtual DOM](#VirtualDOM)
- - [createElement](#createElement)
- - [update](#update)

- [组件化](#组件化)
- - [createComponent](#createComponent)
- - [patch](#patch)
- - [合并配置](#合并配置)
- - [生命周期](#生命周期)
- - [组件注册](#组件注册)
- - [异步组件](#异步组件)

- [深⼊响应式原理](#深⼊响应式原理)
- - [响应式对象](#响应式对象)
- - [依赖收集](#依赖收集)
- - [派发更新](#派发更新)
- - [nextTick](#nextTick)
- - [检测变化的注意事项](#检测变化的注意事项)
- - [计算属性 VS 侦听属性](#计算属性VS侦听属性)
- - [组件更新](#组件更新)
- - [原理图](#原理图)

- [编译](#编译)
- - [编译⼊⼝](#编译⼊⼝)
- - [parse](#parse)
- - [optimize](#optimize)
- - [codegen](#codegen)

- [扩展](#扩展)
- - [event](#event)
- - [v-model](#v-model)
- - [slot](#slot)
- - [keep-alive](#keep-alive)
- - [transition](#transition)
- - [transition-group](#transition-group)

- [Vue-Router](#Vue-Router)
- - [路由注册](#路由注册)
- - [VueRouter 对象](#VueRouter对象)
- - [matcher](#matcher)
- - [路径切换](#路径切换)

- [Vuex](#Vuex)
- - [Vuex 初始化](#Vuex初始化)
- - [API](#API)
- - [插件](#插件)

## <a id="Introduction">Introduction</a>

### <a id="Vue.js技术揭秘">Vue.js 技术揭秘</a>

⽬前社区有很多 Vue.js 的源码解析⽂章，但是质量层次不⻬，不够系统和全⾯，这本电⼦书的⽬标是 全⽅位细致深度解析 Vue.js 的实现原理，让同学们可以彻底掌握 Vue.js。⽬前分析的版本是 Vue.js 的最 新版本 Vue.js 2.5.17-beta.0，并且之后会随着版本升级⽽做相应的更新，充分发挥电⼦书的优势。

这本电⼦书是作为 《Vue.js 源码揭秘》视频课程的辅助教材。电⼦书是开源的，同学们可以免费阅 读，视频是收费的，25+⼩时纯⼲货课程，如果有需要的同学可以购买来学习，**但请务必⽀持正版，请 尊重作者的劳动成果**。

### <a id="章节⽬录">章节⽬录</a>

为了把 Vue.js 的源码讲明⽩，课程设计成由浅⼊深，分为核⼼、编译、扩展、生态四个⽅⾯去讲总 共，并拆成了⼋个章节，如下图：

![](image\knowledge\章节图.png)

#### 第⼀章：准备⼯作

介绍了 Flow、Vue.js 的源码⽬录设计、Vue.js 的源码构建⽅式，以及从⼊⼝开始分析了 Vue.js 的初始 化过程。

#### 第⼆章：数据驱动

详细讲解了模板数据到 DOM 渲染的过程，从 new Vue 开始，分析了 mount 、 render 、 update 、 patch 等流程。

#### 第三章：组件化

分析了组件化的实现原理，并且分析了组件周边的原理实现，包括合并配置、生命周期、组件注册、 异步组件。

#### 第四章：深⼊响应式原理

详细讲解了数据的变化如何驱动视图的变化，分析了响应式对象的创建，依赖收集、派发更新的实现 过程，⼀些特殊情况的处理，并对⽐了计算属性和侦听属性的实现，最后分析了组件更新的过程。

#### 第五章：编译

从编译的⼊⼝函数开始，分析了编译的三个核⼼流程的实现： parse -> optimize -> codegen 。

#### 第六章：扩展

详细讲解了 event 、 v-model 、 slot 、 keep-alive 、 transition 、 transition-group 等 常⽤功能的原理实现，该章节作为⼀个可扩展章节，未来会分析更多 Vue 提供的特性。

#### 第七章：Vue-Router

分析了 Vue-Router 的实现原理，从路由注册开始，分析了路由对象、 matcher ，并深⼊分析了整个路 径切换的实现过程和细节。

#### 第⼋章：Vuex

分析了 Vuex 的实现原理，深⼊分析了它的初始化过程，常⽤ API 以及插件部分的实现。

## <a id="准备⼯作">准备⼯作</a>

那么从这⼀章开始我们即将分析 Vue 的源码，我们将会介绍⼀些前置知识如 flow、源码⽬录、构建⽅ 式、编译⼊⼝等。

除此之外，我希望你已经⽤过 Vue 做过 2 个以上的实际项⽬，对 Vue 的思想有了⼀定的了解，对绝⼤ 部分的 API 都已经有使⽤。同时，我也要求你有⼀定的原生 JavaScript 的功底，并对代码调试有⼀定的 了解。

如果你具备了以上条件，并且对 Vue 的实现原理很感兴趣，那么就可以开始这门课程的学习了，我将 会为你打开 Vue 的底层世界⼤门，对它的实现细节⼀探究竟。

### <a id="认识 FLow">认识 FLow</a>

认识 Flow Flow 是 facebook 出品的 JavaScript 静态类型检查⼯具。Vue.js 的源码利⽤了 Flow 做了静态类型检查， 所以了解 Flow 有助于我们阅读源码。

#### 为什么⽤ Flow

JavaScript 是动态类型语⾔，它的灵活性有⽬共睹，但是过于灵活的副作⽤是很容易就写出⾮常隐蔽的 隐患代码，在编译期甚⾄看上去都不会报错，但在运⾏阶段就可能出现各种奇怪的 bug。

类型检查是当前动态类型语⾔的发展趋势，所谓类型检查，就是在编译期尽早发现（由类型错误引起 的）bug，⼜不影响代码运⾏（不需要运⾏时动态检查类型），使编写 JavaScript 具有和编写 Java 等强 类型语⾔相近的体验。

项⽬越复杂就越需要通过⼯具的⼿段来保证项⽬的维护性和增强代码的可读性。 Vue.js 在做 2.0 重构的 时候，在 ES2015 的基础上，除了 ESLint 保证代码⻛格之外，也引⼊了 Flow 做静态类型检查。之所以 选择 Flow，主要是因为 Babel 和 ESLint 都有对应的 Flow 插件以⽀持语法，可以完全沿⽤现有的构建 配置，⾮常⼩成本的改动就可以拥有静态类型检查的能⼒。

#### Flow 的⼯作⽅式

通常类型检查分成 2 种⽅式：

- 类型推断：通过变量的使⽤上下⽂来推断出变量类型，然后根据这些推断来检查类型。
- 类型注释：事先注释好我们期待的类型，Flow 会基于这些注释来判断。

#### 类型判断

它不需要任何代码修改即可进⾏类型检查，最⼩化开发者的⼯作量。它不会强制你改变开发习惯，因 为它会⾃动推断出变量的类型。这就是所谓的类型推断，Flow 最重要的特性之⼀。

通过⼀个简单例⼦说明⼀下：

```js
/*@flow*/
function split(str) {
  return str.split(' ')
}
split(11)
```

Flow 检查上述代码后会报错，因为函数 split 期待的参数是字符串，⽽我们输⼊了数字。

#### 类型注释

认识 FLow 如上所述，类型推断是 Flow 最有⽤的特性之⼀，不需要编写类型注释就能获取有⽤的反馈。但在某些 特定的场景下，添加类型注释可以提供更好更明确的检查依据。

考虑如下代码：

```js
/*@flow*/
function add(x, y) {
  return x + y
}
add('Hello', 11)
```

Flow 检查上述代码时检查不出任何错误，因为从语法层⾯考虑， + 即可以⽤在字符串上，也可以⽤ 在数字上，我们并没有明确指出 add() 的参数必须为数字。

在这种情况下，我们可以借助类型注释来指明期望的类型。类型注释是以冒号 : 开头，可以在函数 参数，返回值，变量声明中使⽤。

如果我们在上段代码中添加类型注释，就会变成如下：

```js
/*@flow*/
function add(x: number, y: number): number {
  return x + y
}
add('Hello', 11)
```

现在 Flow 就能检查出错误，因为函数参数的期待类型为数字，⽽我们提供了字符串。

上⾯的例⼦是针对函数的类型注释。接下来我们来看看 Flow 能⽀持的⼀些常⻅的类型注释。

#### 数组

```js
/*@flow*/
var arr: Array<number> = [1, 2, 3] arr.push('Hello')
```

数组类型注释的格式是 Array<T> ， T 表⽰数组中每项的数据类型。在上述代码中，arr 是每项均为 数字的数组。如果我们给这个数组添加了⼀个字符串，Flow 能检查出错误。

#### 类和对象

```js
/*@flow*/
class Bar {
  x: string; // x 是字符串
  y: string | number; // y 可以是字符串或者数字
  z: boolean;

  constructor(x: string, y: string | number) {
    this.x = x this.y = y this.z = false }
  }
  var bar: Bar = new Bar('hello', 4)
  var obj: { a: string, b: number, c: Array<string>, d: Bar } = {
    a: 'hello',
    b: 11,
    c: ['hello', 'world'],
    d: new Bar('hello', 3)
  }
```

类的类型注释格式如上，可以对类⾃⾝的属性做类型检查，也可以对构造函数的参数做类型检查。这 ⾥需要注意的是，属性 y 的类型中间⽤ | 做间隔，表⽰ y 的类型即可以是字符串也可以是数字。

对象的注释类型类似于类，需要指定对象属性的类型。

#### Null

若想任意类型 T 可以为 null 或者 undefined ，只需类似如下写成 ?T 的格式即可。

```js
/*@flow*/
var foo: ?string = null
```

此时， foo 可以为字符串，也可以为 null 。 ⽬前我们只列举了 Flow 的⼀些常⻅的类型注释。如果想了解所有类型注释，请移步 Flow 的[官⽅⽂档](https://flow.org/en/docs/types/)。

#### Flow 在 Vue.js 源码中的应⽤

有时候我们想引⽤第三⽅库，或者⾃定义⼀些类型，但 Flow 并不认识，因此检查的时候会报错。为了解决这类问题，Flow 提出了⼀个 libdef 的概念，可以⽤来识别这些第三⽅库或者是⾃定义类型，⽽ Vue.js 也利⽤了这⼀特性。

在 Vue.js 的主⽬录下有 .flowconfig ⽂件， 它是 Flow 的配置⽂件，感兴趣的同学可以看[官⽅⽂档](https://flow.org/en/docs/config/)。这其中的 [libs] 部分⽤来描述包含指定库定义的⽬录，默认是名为 flow-typed 的⽬录。

这⾥ [libs] 配置的是 flow ，表⽰指定的库定义都在 flow ⽂件夹内。我们打开这个⽬录，会发 现⽂件如下：

| flow                            |
| :------------------------------ |
| compiler.js # 编译相关          |
| component.js # 组件数据结构     |
| global-api.js # Global API 结构 |
| modules.js # 第三⽅库定义       |
| options.js # 选项相关           |
| ssr.js # 服务端渲染相关         |
| vnode.js # 虚拟 node 相关       |

可以看到，Vue.js 有很多⾃定义类型的定义，在阅读源码的时候，如果遇到某个类型并想了解它完整的 数据结构的时候，可以回来翻阅这些数据结构的定义。

#### 总结

通过对 Flow 的认识，有助于我们阅读 Vue 的源码，并且这种静态类型检查的⽅式⾮常有利于⼤型项⽬ 源码的开发和维护。类似 Flow 的⼯具还有如 TypeScript，感兴趣的同学也可以⾃⾏去了解⼀下。

### <a id="Vue.js源码⽬录设计">Vue.js 源码⽬录设计</a>

Vue.js 的源码都在 src ⽬录下，其⽬录结构如下。

| src                        |
| :------------------------- |
| compiler # 编译相关        |
| core # 核⼼代码            |
| platforms # 不同平台的⽀持 |
| server # 服务端渲染        |
| sfc # .vue ⽂件解析        |
| shared # 共享代码          |

#### compiler

compiler ⽬录包含 Vue.js 所有编译相关的代码。它包括把模板解析成 ast 语法树，ast 语法树优化，代码 生成等功能。

编译的⼯作可以在构建时做（借助 webpack、vue-loader 等辅助插件）；也可以在运⾏时做，使⽤包含 构建功能的 Vue.js。显然，编译是⼀项耗性能的⼯作，所以更推荐前者——离线编译。

#### core

core ⽬录包含了 Vue.js 的核⼼代码，包括内置组件、全局 API 封装，Vue 实例化、观察者、虚拟 DOM、⼯具函数等等。

这⾥的代码可谓是 Vue.js 的灵魂，也是我们之后需要重点分析的地⽅。

#### platform

Vue.js 是⼀个跨平台的 MVVM 框架，它可以跑在 web 上，也可以配合 weex 跑在 natvie 客户端上。 platform 是 Vue.js 的⼊⼝，2 个⽬录代表 2 个主要⼊⼝，分别打包成运⾏在 web 上和 weex 上的 Vue.js。

我们会重点分析 web ⼊⼝打包后的 Vue.js，对于 weex ⼊⼝打包的 Vue.js，感兴趣的同学可以⾃⾏研 究。

#### server

Vue.js 2.0 ⽀持了服务端渲染，所有服务端渲染相关的逻辑都在这个⽬录下。注意：这部分代码是跑在 服务端的 Node.js，不要和跑在浏览器端的 Vue.js 混为⼀谈。

服务端渲染主要的⼯作是把组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将 静态标记"混合"为客户端上完全交互的应⽤程序。

#### sfc

通常我们开发 Vue.js 都会借助 webpack 构建， 然后通过 .vue 单⽂件的编写组件。

这个⽬录下的代码逻辑会把 .vue ⽂件内容解析成⼀个 JavaScript 的对象。

#### shared

Vue.js 会定义⼀些⼯具⽅法，这⾥定义的⼯具⽅法都是会被浏览器端的 Vue.js 和服务端的 Vue.js 所共享的。

#### 总结

从 Vue.js 的⽬录设计可以看到，作者把功能模块拆分的⾮常清楚，相关的逻辑放在⼀个独⽴的⽬录下 维护，并且把复⽤的代码也抽成⼀个独⽴⽬录。

这样的⽬录设计让代码的阅读性和可维护性都变强，是⾮常值得学习和推敲的。

### <a id="Vue.js源码构建">Vue.js 源码构建</a>

Vue.js 源码是基于 Rollup 构建的，它的构建相关配置都在 scripts ⽬录下。

#### 构建脚本

通常⼀个基于 NPM 托管的项⽬都会有⼀个 package.json ⽂件，它是对项⽬的描述⽂件，它的内容实际 上是⼀个标准的 JSON 对象。

我们通常会配置 script 字段作为 NPM 的执⾏脚本，Vue.js 源码构建的脚本如下：

```json
{
  "script": {
    "build": "node scripts/build.js",
    "build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",
    "build:weex": "npm run build --weex"
  }
}
```

这⾥总共有 3 条命令，作⽤都是构建 Vue.js，后⾯ 2 条是在第⼀条命令的基础上，添加⼀些环境参数。

当在命令⾏运⾏ npm run build 的时候，实际上就会执⾏ node scripts/build.js ，接下来我们 来看看它实际是怎么构建的。

#### 构建过程

我们对于构建过程分析是基于源码的，先打开构建的⼊⼝ JS ⽂件，在 scripts/build.js 中：

```js
/**
 * * 从配置文件读取配置，再通过命令行参数对构建配置做过滤，这样就可以构建出不同用途的 Vue 了
 */
let builds = require('./config').getAllBuilds()

// filter builds via command line arg
if (process.argv[2]) {
  const filters = process.argv[2].split(',')
  builds = builds.filter((b) => {
    return filters.some(
      (f) => b.output.file.indexOf(f) > -1 || b._name.indexOf(f) > -1
    )
  })
} else {
  // filter out weex builds by default
  builds = builds.filter((b) => {
    return b.output.file.indexOf('weex') === -1
  })
}
build(builds)
```

这段代码逻辑⾮常简单，先从配置⽂件读取配置，再通过命令⾏参数对构建配置做过滤，这样就可以构建出不同⽤途的 Vue.js 了。接下来我们看⼀下配置⽂件，在 scripts/config.js 中：

```js
const builds = {
  // Runtime only (CommonJS). Used by bundlers e.g. Webpack & Browserify
  'web-runtime-cjs': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.common.js'),
    format: 'cjs',
    banner
  },
  // Runtime+compiler CommonJS build (CommonJS)
  'web-full-cjs': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.common.js'),
    format: 'cjs',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime only (ES Modules). Used by bundlers that support ES Modules, // e.g. Rollup & Webpack 2
  'web-runtime-esm': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.esm.js'),
    format: 'es',
    banner
  },
  // Runtime+compiler CommonJS build (ES Modules)
  'web-full-esm': {
    entry: resolve('web/entry-runtime-with-compiler.js'), // * 入口 JS 文件
    dest: resolve('dist/vue.esm.js'), // * 构建后的 JS 文件地址
    format: 'es', // * 构建的格式，遵循 ES Module 规范
    alias: { he: './entity-decoder' },
    banner
  },
  // runtime-only build (Browser)
  'web-runtime-dev': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.js'),
    format: 'umd',
    env: 'development',
    banner
  },
  // runtime-only production build (Browser)
  'web-runtime-prod': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.min.js'),
    format: 'umd',
    env: 'production',
    banner
  },
  // Runtime+compiler development build (Browser)
  'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime+compiler production build (Browser)
  'web-full-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.min.js'),
    format: 'umd',
    env: 'production',
    alias: { he: './entity-decoder' },
    banner
  } // ...
}
```

这⾥列举了⼀些 Vue.js 构建的配置，关于还有⼀些服务端渲染 webpack 插件以及 weex 的打包配置就不 列举了。

对于单个配置，它是遵循 Rollup 的构建规则的。其中 entry 属性表⽰构建的⼊⼝ JS ⽂件地 址， dest 属性表⽰构建后的 JS ⽂件地址。 format 属性表⽰构建的格式， cjs 表⽰构建出来的 ⽂件遵循 CommonJS 规范， es 表⽰构建出来的⽂件遵循 ES Module 规范。 umd 表⽰构建出来的⽂ 件遵循 UMD 规范。

以 web-runtime-cjs 配置为例，它的 entry 是 resolve('web/entry-runtime.js') ，先来看⼀ 下 resolve 函数的定义。

源码⽬录： scripts/config.js

```js
// * resolve 函数把传入的参数路径做分割，取第一个元素为 base，使用 alias 匹配的路径拼接 base 后的路径，得到完整路径
const aliases = require('./alias')
const resolve = (p) => {
  const base = p.split('/')[0]
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1))
  } else {
    return path.resolve(__dirname, '../', p)
  }
}
```

这⾥的 resolve 函数实现⾮常简单，它先把 resolve 函数传⼊的参数 p 通过 / 做了分割成数 组，然后取数组第⼀个元素设置为 base 。在我们这个例⼦中，参数 p 是 web/entry- runtime.js ，那么 base 则为 web 。 base 并不是实际的路径，它的真实路径借助了别名的配置，我们来看⼀下别名配置的代码，在 scripts/alias 中：

```js
const path = require('path')
module.exports = {
  vue: path.resolve(
    __dirname,
    '../src/platforms/web/entry-runtime-with-compiler'
  ),
  compiler: path.resolve(__dirname, '../src/compiler'),
  core: path.resolve(__dirname, '../src/core'),
  shared: path.resolve(__dirname, '../src/shared'),
  web: path.resolve(__dirname, '../src/platforms/web'),
  weex: path.resolve(__dirname, '../src/platforms/weex'),
  server: path.resolve(__dirname, '../src/server'),
  entries: path.resolve(__dirname, '../src/entries'),
  sfc: path.resolve(__dirname, '../src/sfc')
}
```

很显然，这⾥ web 对应的真实的路径是 path.resolve(\_\_dirname, '../src/platforms/web') ， 这个路径就找到了 Vue.js 源码的 web ⽬录。然后 resolve 函数通过 path.resolve(aliases[base], p.slice(base.length + 1)) 找到了最终路径，它就是 Vue.js 源码 web ⽬录下的 entry-runtime.js 。因此， web-runtime-cjs 配置对应的⼊⼝⽂件就找到了。 它经过 Rollup 的构建打包后，最终会在 dist ⽬录下生成 vue.runtime.common.js 。

#### Runtime Only VS Runtime+Compiler

通常我们利⽤ vue-cli 去初始化我们的 Vue.js 项⽬的时候会询问我们⽤ Runtime Only 版本的还是 Runtime+Compiler 版本。下⾯我们来对⽐这两个版本。

- Runtime Only

  我们在使⽤ Runtime Only 版本的 Vue.js 的时候，通常需要借助如 webpack 的 vue-loader ⼯具把 .vue ⽂ 件编译成 JavaScript，因为是在编译阶段做的，所以它只包含运⾏时的 Vue.js 代码，因此代码体积也会 更轻量。

- Runtime + Compiler
  我们如果没有对代码做预编译，但⼜使⽤了 Vue 的 template 属性并传⼊⼀个字符串，则需要在客户端 编译模板，如下所⽰：

```js
// 需要编译器的版本
new Vue({ template: '<div>{{ hi }}</div>' })

// 这种情况不需要
new Vue({
  render(h) {
    return h('div', this.hi)
  }
})
```

因为在 Vue.js 2.0 中，最终渲染都是通过 render 函数，如果写 template 属性，则需要编译成 render 函数，那么这个编译过程会发生运⾏时，所以需要带有编译器的版本。 很显然，这个编译过程对性能会有⼀定损耗，所以通常我们更推荐使⽤ Runtime-Only 的 Vue.js。

#### 官方文档 之 对不同版本构建的解释

[对不同版本构建的解释](https://cn.vuejs.org/v2/guide/installation.html#%E5%AF%B9%E4%B8%8D%E5%90%8C%E6%9E%84%E5%BB%BA%E7%89%88%E6%9C%AC%E7%9A%84%E8%A7%A3%E9%87%8A)

在 NPM 包的 dist/ 目录你将会找到很多不同的 Vue.js 构建版本。这里列出了它们之间的差别：

| 版本                     | UMD                | CommonJS              | ES Module (基于构建工具使用) | ES Module (直接用于浏览器) |
| :----------------------- | ------------------ | --------------------- | ---------------------------- | -------------------------- |
| 完整版                   | vue.js             | vue.common.js         | vue.esm.js                   | vue.esm.browser.js         |
| 只包含运行时版           | vue.runtime.js     | vue.runtime.common.js | vue.runtime.esm.js           |                            |
| 完整版(生产环境)         | vue.min.js         |                       |                              | vue.esm.browser.min.js     |
| 只包含运行时版(生产环境) | vue.runtime.min.js |                       |                              |                            |

##### 术语

- 完整版：同时包含编译器和运行时的版本。

- 编译器：用来将模板字符串编译成为 JavaScript 渲染函数的代码。

- 运行时：用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码。基本上就是除去编译器的其它一切。

- [UMD](https://github.com/umdjs/umd)：UMD 版本可以通过 `<script>` 标签直接用在浏览器中。jsDelivr CDN 的 <https://cdn.jsdelivr.net/npm/vue> 默认文件就是运行时 + 编译器的 UMD 版本 (vue.js)。

- [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1)：CommonJS 版本用来配合老的打包工具比如 [Browserify](http://browserify.org/) 或 [webpack 1](https://webpack.github.io/)。这些打包工具的默认文件 (pkg.main) 是只包含运行时的 CommonJS 版本 (vue.runtime.common.js)。

- [ES Module](http://exploringjs.com/es6/ch_modules.html)：从 2.6 开始 Vue 会提供两个 ES Modules (ESM) 构建文件：

- - 为打包工具提供的 ESM：为诸如 [webpack 2](https://webpack.js.org/) 或 [Rollup](https://rollupjs.org/) 提供的现代打包工具。ESM 格式被设计为可以被静态分析，所以打包工具可以利用这一点来进行"tree-shaking"并将用不到的代码排除出最终的包。为这些打包工具提供的默认文件 (pkg.module) 是只有运行时的 ES Module 构建 (vue.runtime.esm.js)。
- - 为浏览器提供的 ESM (2.6+)：用于在现代浏览器中通过 `<script type="module">` 直接导入。

##### 运行时 + 编译器 vs. 只包含运行时

如果你需要在客户端编译模板 (比如传入一个字符串给 template 选项，或挂载到一个元素上并以其 DOM 内部的 HTML 作为模板)，就将需要加上编译器，即完整版：

```js
// 需要编译器
new Vue({
  template: '<div>{{ hi }}</div>'
})

// 不需要编译器
new Vue({
  render(h) {
    return h('div', this.hi)
  }
})
```

**当使用 vue-loader 或 vueify 的时候，\*.vue 文件内部的模板会在构建时预编译成 JavaScript。你在最终打好的包里实际上是不需要编译器的，所以只用运行时版本即可。**

**因为运行时版本相比完整版体积要小大约 30%，所以应该尽可能使用这个版本。如果你仍然希望使用完整版，则需要在打包工具里配置一个别名：**

- webpack

```js
module.exports = {
  // ...
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
    }
  }
}
```

- Rollup

```js
const alias = require('rollup-plugin-alias')

rollup({
  // ...
  plugins: [
    alias({
      vue: require.resolve('vue/dist/vue.esm.js')
    })
  ]
})
```

- Browserify

添加到你项目的 package.json：

```js
{
  // ...
  "browser": {
    "vue": "vue/dist/vue.common.js"
  }
}
```

- Parcel

在你项目的 package.json 中添加：

```js
{
  // ...
  "alias": {
    "vue" : "./node_modules/vue/dist/vue.common.js"
  }
}
```

##### 开发环境 vs. 生产环境

对于 UMD 版本来说，开发环境/生产环境模式是硬编码好的：开发环境下用未压缩的代码，生产环境下使用压缩后的代码。

CommonJS 和 ES Module 版本是用于打包工具的，因此我们不提供压缩后的版本。你需要自行将最终的包进行压缩。

CommonJS 和 ES Module 版本同时保留原始的 process.env.NODE_ENV 检测，以决定它们应该运行在什么模式下。你应该使用适当的打包工具配置来替换这些环境变量以便控制 Vue 所运行的模式。把 process.env.NODE_ENV 替换为字符串字面量同时可以让 UglifyJS 之类的压缩工具完全丢掉仅供开发环境的代码块，以减少最终的文件尺寸。

- webpack

在 webpack 4+ 中，你可以使用 mode 选项：

```js
module.exports = {
  mode: 'production'
}
```

但是在 webpack 3 及其更低版本中，你需要使用 [DefinePlugin](https://webpack.js.org/plugins/define-plugin/)：

```js
var webpack = require('webpack')

module.exports = {
  // ...
  plugins: [
    // ...
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}
```

- Rollup

使用 [rollup-plugin-replace](https://github.com/rollup/rollup-plugin-replace)：

```js
const replace = require('rollup-plugin-replace')

rollup({
  // ...
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}).then(/* ... */)
```

- Browserify

为你的包应用一次全局的 [envify](https://github.com/hughsk/envify) 转换。

```shell
NODE_ENV=production browserify -g envify -e main.js | uglifyjs -c -m > build.js
```

也可以移步[生产环境部署](https://cn.vuejs.org/v2/guide/deployment.html)。

##### CSP 环境

有些环境，如 Google Chrome Apps，会强制应用内容安全策略 (CSP)，不能使用 new Function() 对表达式求值。这时可以用 CSP 兼容版本。完整版本依赖于该功能来编译模板，所以无法在这些环境下使用。

另一方面，运行时版本则是完全兼容 CSP 的。当通过 [webpack + vue-loader](https://github.com/vuejs-templates/webpack-simple) 或者 [Browserify + vueify](https://github.com/vuejs-templates/browserify-simple) 构建时，模板将被预编译为 render 函数，可以在 CSP 环境中完美运行。

##### 开发版本

**重要：GitHub 仓库的 /dist 文件夹只有在新版本发布时才会提交。如果想要使用 GitHub 上 Vue 最新的源码，你需要自己构建！**

```shell
git clone https://github.com/vuejs/vue.git node_modules/vue
cd node_modules/vue
npm install
npm run build
```

##### Bower

Bower 只提供 UMD 版本。

```shell
# 最新稳定版本
$ bower install vue
```

##### AMD 模块加载器

所有 UMD 版本都可以直接用作 AMD 模块。

#### 总结

通过这⼀节的分析，我们可以了解到 Vue.js 的构建打包过程，也知道了不同作⽤和功能的 Vue.js 它们 对应的⼊⼝以及最终编译生成的 JS ⽂件。尽管在实际开发过程中我们会⽤ Runtime Only 版本开发⽐较 多，但为了分析 Vue 的编译过程，我们这门课重点分析的源码是 Runtime+Compiler 的 Vue.js。

### <a id="从⼊⼝开始">从⼊⼝开始</a>

我们之前提到过 Vue.js 构建过程，在 web 应⽤下，我们来分析 Runtime + Compiler 构建出来的 Vue.js， 它的⼊⼝是 src/platforms/web/entry-runtime-with-compiler.js ：

```js
/* @flow */

import config from 'core/config'
import { warn, cached } from 'core/util/index'
import { mark, measure } from 'core/util/perf'

// * 该文件中 Vue 的来源
import Vue from './runtime/index'
import { query } from './util/index'
import { compileToFunctions } from './compiler/index'
import {
  shouldDecodeNewlines,
  shouldDecodeNewlinesForHref
} from './util/compat'

const idToTemplate = cached((id) => {
  const el = query(id)
  return el && el.innerHTML
})

const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' &&
      warn(
        `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
      )
    return this
  }

  const options = this.$options
  // resolve template/el and convert to render function
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }

      const { render, staticRenderFns } = compileToFunctions(
        template,
        {
          shouldDecodeNewlines,
          shouldDecodeNewlinesForHref,
          delimiters: options.delimiters,
          comments: options.comments
        },
        this
      )
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }
  return mount.call(this, el, hydrating)
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML(el: Element): string {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions

export default Vue
```

那么，当我们的代码执⾏ import Vue from 'vue' 的时候，就是从这个⼊⼝执⾏代码来初始化 Vue， 那么 Vue 到底是什么，它是怎么初始化的，我们来⼀探究竟。

#### Vue 的⼊⼝

在这个⼊⼝ JS 的上⽅我们可以找到 Vue 的来源： import Vue from './runtime/index' ，我们先来看⼀下这块⼉的实现，它定义在 src/platforms/web/runtime/index.js 中：

```js
/* @flow */

// * 该文件中 Vue 来源
import Vue from 'core/index'
import config from 'core/config'
import { extend, noop } from 'shared/util'
import { mountComponent } from 'core/instance/lifecycle'
import { devtools, inBrowser, isChrome } from 'core/util/index'

import {
  query,
  mustUseProp,
  isReservedTag,
  isReservedAttr,
  getTagNamespace,
  isUnknownElement
} from 'web/util/index'

import { patch } from './patch'
import platformDirectives from './directives/index'
import platformComponents from './components/index'

// install platform specific utils
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives)
extend(Vue.options.components, platformComponents)

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop

// public mount method
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}

export default Vue
```

这⾥关键的代码是 import Vue from 'core/index' ，之后的逻辑都是对 Vue 这个对象做⼀些扩展， 可以先不⽤看，我们来看⼀下真正初始化 Vue 的地⽅，在 src/core/index.js 中：

```js
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

// * 初始化全局 API
// * Vue 在整个初始化过程中，除了给他的原型 prototype 上拓展方法，还会给 Vue 这个对象本身拓展全局的静态方法
initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue
```

这⾥有 2 处关键的代码， import Vue from './instance/index' 和 initGlobalAPI(Vue) ，初始化全局 Vue API（我们稍后介绍），我们先来看第⼀部分，在 src/core/instance/index.js 中：

#### Vue 的定义

```js
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue(options) {
  // * 这里判断如果不是通过 new 关键字去实例 Vue，则抛错
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

/**
 * * 为何 Vue 不用 ES6 的 Class 去实现呢? 我们往后看下面有很多 Mixin 函数调用，并把当前 Vue 传入，它们的功能都是给 Vue 的 prototype 上拓展一些方法，Vue 按功能把这些拓展分散到多个模块中去实现，而不是在一个模块里实现所有，这种方式是用 Class 难以实现的。这么做的好处是非常方便代码的维护和管理，这种编程技巧非常值得我们学习
 */
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

在这⾥，我们终于看到了 Vue 的庐⼭真⾯⽬，它实际上就是⼀个⽤ Function 实现的类，我们只能通过 new Vue 去实例化它。

有些同学看到这不禁想问，为何 Vue 不⽤ ES6 的 Class 去实现呢？我们往后看这⾥有很多 xxxMixin 的函数调⽤，并把 Vue 当参数传⼊，它们的功能都是给 Vue 的 prototype 上扩展⼀些⽅法（这⾥具体 的细节会在之后的⽂章介绍，这⾥不展开），Vue 按功能把这些扩展分散到多个模块中去实现，⽽不 是在⼀个模块⾥实现所有，这种⽅式是⽤ Class 难以实现的。这么做的好处是⾮常⽅便代码的维护和管 理，这种编程技巧也⾮常值得我们去学习。

##### initGlobalAPI

Vue.js 在整个初始化过程中，除了给它的原型 prototype 上扩展⽅法，还会给 Vue 这个对象本⾝扩展 全局的静态⽅法，它的定义在 src/core/global-api/index.js 中：

```js
/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI(Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  // * Vue.util 上的方法最好不要去使用，因为他不稳定，可能经常发生变化
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // * Vue[filters, components, directives]
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach((type) => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  extend(Vue.options.components, builtInComponents)

  // * Vue.use 方法的定义
  initUse(Vue)
  // * Vue.mixin 方法的定义
  initMixin(Vue)
  // * Vue.extend 方法的定义
  initExtend(Vue)
  // * Vue[filter, component, directive] 三个方法的定义
  initAssetRegisters(Vue)
}
```

这⾥就是在 Vue 上扩展的⼀些全局⽅法的定义，Vue 官⽹中关于全局 API 都可以在这⾥找到，这⾥不 会介绍细节，会在之后的章节我们具体介绍到某个 API 的时候会详细介绍。**有⼀点要注意的 是， Vue.util 暴露的⽅法最好不要依赖，因为它可能经常会发生变化，是不稳定的。**

#### 总结

那么⾄此，Vue 的初始化过程基本介绍完毕。这⼀节的⽬的是让同学们对 Vue 是什么有⼀个直观的认 识，它本质上就是⼀个⽤ Function 实现的 Class，然后它的原型 prototype 以及它本⾝都扩展了⼀系列的 ⽅法和属性，那么 Vue 能做什么，它是怎么做的，我们会在后⾯的章节⼀层层帮⼤家揭开 Vue 的神秘 ⾯纱。

## <a id="数据驱动">数据驱动</a>

### <a id="newVue发生了什么">new Vue 发生了什么</a>

我们在使用 Vue 的时候，发现在 Vue 实例中从 this 下面拿到 data 的属性以及 methods，props，computed 等的属性和方法，这是因为这些属性和方法都被 Vue 实例代理了。

```js
export default {
  name: 'App',
  data() {
    return {
      message: '第一个Vue实例'
    }
  },
  mounted() {
    console.log(this.message) // '第一个Vue实例'
  }
}
```

#### 官方文档 之 data，Vue 实例的数据对象

[data](https://cn.vuejs.org/v2/api/#data)

Vue 实例的数据对象。

**Vue 将会递归将 data 的 property 转换为 getter/setter，从而让 data 的 prototype 能够响应数据变化。**

**对象必须是纯粹的对象(含有零个或多个 key/value 对)：浏览器 API 创建的原生对象，原型上的 property 会被忽略。大概来说，data 应该只能是数据 - 不推荐观察拥有状态行为的对象。**

**一旦观察过，你就无法在根数据对象上添加响应式 property。因此推荐在创建实例之前，就声明所有的根级响应式 property**。这里猜测是在根节点挂载之前就已经对根数据做了响应式，如下源代码：

/src/core/instance/init.js

```js
// ...
import { initState } from './state'
// ...

export function initMixin(Vue: Class<Component>) {
  // * Vue 初始化主要就干了几件事情：合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data，props，computed，watcher 等等
  Vue.prototype._init = function (options?: Object) {
    // ...

    // * 初始化 data，props，watch，computed，methods 等
    initState(vm)

    // ...

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```

/src/core/instance/state.js

```js
// ...

export function proxy(target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

// ...

function initData(vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' &&
      warn(
        'data functions should return an object:\n' +
          'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
        vm
      )
  }
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(`Method "${key}" has already been defined as a data property.`, vm)
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' &&
        warn(
          `The data property "${key}" is already declared as a prop. ` +
            `Use prop default value instead.`,
          vm
        )
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key)
    }
  }
  // observe data
  // * 响应式
  observe(data, true /* asRootData */)
}

// ...
```

**实例创建之后，可以通过 vm.$data 访问原始数据对象。Vue 实例也代理了 data 对象上所有的 property，因此访问 vm.a 等价于访问 vm.$data.a**

**以 `_` 或 `$` 开头的 property 不会被 Vue 实例代理，因为它们可能和 Vue 内置的 property，API 方法冲突：**

![](image/knowledge/_或$开头定义data属性报错.png)

**你可以使用例如 vm.$data.\_property 的方式访问这些 property。**

**当一个组件被定义，data 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果 data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象! 通过提供 data 函数，每次创建一个新实例后，我们能够调用 data 函数，从而返回初始数据的一个全新副本数据对象。**

**注意：在 Vue.extend()，data 必须是函数**

```js
var Component = Vue.extend({
  data() {
    return { a: 1 }
  }
})
```

**注意：如果你为 data property 使用了箭头函数，则 this 不会指向这个组件的实例，不过你仍然可以将其实例作为函数的第一个参数来访问。**

```js
data: (vm) => ({ a: vm.myProp })
```

#### initState(vm)

在上面我们提到了在 Vue 的 \_init 函数中，做的主要工作是初始化各种配置，也提到了 Vue 实例代理了 data。那么这里就具体来聊一聊 \_init 函数中的 initState(vm)

在 initState(vm) 中，就定义了一个代理函数 proxy，针对 data property 做代理

```js
import { noop } from '../util/index'

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

export function proxy(target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```

这一段代码的逻辑也很简单且清晰，而这里的 sourceKey 其实就是字符串 `_data`，如下：(这里先不管递归，只要知道 proxy 和 initData 的实现就够了)

```js
function initProps(vm: Component, propsOptions: Object) {
  // ...

  for (const key in propsOptions) {
    // ...

    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, `_props`, key)
    }
  }
  // ...
}

function initData(vm: Component) {
  let data = vm.$options.data
  // 判断 data 是否是函数
  // 使用 vm.xxx 即是访问 vm._data.xxx
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {}
  // 如果 data 不是纯对象
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' &&
      warn(
        'data functions should return an object:\n' +
          'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
        vm
      )
  }
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  // 下面的两个最外层 if 都是对 methods 和 props 中不能重复定义 data 中已定义过的 property 做处理，因为它们最终都会挂载到 vm 实例上作为 vm 的 property
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(`Method "${key}" has already been defined as a data property.`, vm)
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' &&
        warn(
          `The data property "${key}" is already declared as a prop. ` +
            `Use prop default value instead.`,
          vm
        )
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key)
    }
  }
  // observe data
  // 响应式处理，这里先不管
  observe(data, true /* asRootData */)
}

export function getData(data: Function, vm: Component): any {
  // #7573 disable dep collection when invoking data getters
  // pushTarget 先不管
  pushTarget()
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, `data()`)
    return {}
  } finally {
    popTarget()
  }
}
```

### <a id="Vue 实例挂载的实现">Vue 实例挂载的实现</a>

实力挂载的方法是 Vue.prototype.$mount，在 /src/platforms/web/entry-runtime-with-compiler.js 中。

可以看到，在声明 Vue.prototype.$mount 之前，还对现有的 $mount 方法做了缓存，这个方法是 
