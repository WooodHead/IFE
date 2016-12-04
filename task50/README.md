# Task50

> A Vue.js project







## Vue+Webpack

使用vue-cli(脚手架，自动生成模板工程)官方提供的命令行工具：

```bash
# 全局安装 vue-cli
$ npm install --global vue-cli
# 创建一个基于 webpack 模板的新项目
$  vue init webpack my-project
# 安装依赖，走你
$ cd my-project
$ npm install
$ npm run dev
```

* vue的template中的```export default{}```编译时会自动生成new Vue({})

* index.html中应该是默认调用src/main.js这个文件

* main.js中```import App from './App'```引入的就是App.vue这个文件，import是ES6的语法，等价于```var App = require('./App')```

* ```npm install```安装的依赖包是node_modules这个文件，```import Vue from vue```就在这个目录下

* vue中注册的组件命名是驼峰的写法，在html中会转换为小写和横杠的写法

* ```.vue```文件就是一个组件：```template + script + style```，组件的data必须是函数，```data () {}```是ES6的语法，相当于```data: function(){}```

* run的时候一路enter下来的结果就是eslint语法检查太严格了。。。

* 父组件向子组件传数据```props```，子组件向父组件传数据```$emit(触发事件)```

* el选项提供将页面上已存在的DOM元素作为Vue实例的挂载目标，vue2.0中所有的挂载元素会被Vue生成的Dom替换，不推荐将vue实例挂载到<html>或<body>上

* main.js中渲染模板的两种写法：template | render

  ```vue
  import Vue from 'vue'
  import App from './App'

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    template: '<App></App>',
    components: { App }
  })
  ```

  ```vue
  import Vue from 'vue'
  import App from './App'

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    components: { App },
    render (createElement) {
      return createElement('app')
    }
  })
  ```



## [Vue-router](http://router.vuejs.org/zh-cn/essentials/getting-started.html)

**路由的作用就是转发信息**

使用 Vue.js 时，我们就已经把组件组合成一个应用了，当你要把 vue-router 加进来，只需要配置组件和路由映射，然后告诉 vue-router 在哪里渲染它们。直接看样例：

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 定义组件
const Home = { template: '<div>This is Home</div>' }
const Foo = { template: '<div>This is Foo</div>' }
const Bar = { template: '<div>This is Bar {{ $route.params.id }}</div>' }
// 创建router实例
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  // 定义路由
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/foo', name: 'foo', component: Foo },
    { path: '/bar/:id', name: 'bar', component: Bar }
  ]
})
// 创建和挂载根实例
new Vue({
  router,
  template: `
    <div id="app">
      <h1>Named Routes</h1>
      <p>Current route name: {{ $route.name }}</p>
      <ul>
        <li><router-link :to="{ name: 'home' }">home</router-link></li>
        <li><router-link :to="{ name: 'foo' }">foo</router-link></li>
        <li><router-link :to="{ name: 'bar', params: { id: 123 }}">bar</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')
```

* import导入vue-router必须通过```Vue.use(VueRouter)```明确安装路由功能，如果是全局的script标签则不需要
* 动态路径参数 以冒号开头```path: '/user/:id'```
* 嵌套路由：<router-view>是组件渲染的出口，嵌套路由配置的嵌套组件在VueRouter的参数中配置children，而且也可以有自己嵌套的<router-view>
* 编程式导航，这部分内容和Html5 History API基本完全相同。点击<router-link>时会内部调用router.push()方法。




## [Vuex](http://vuex.vuejs.org/zh-cn/intro.html)

**vuex是vue.js的状态管理模式，集中存储管理应用的所有组件的状态。** 

单个组件内是单向数据流：state(data)->view(template)->actions(methods)->state(data)，当多个组件共享状态时，有很多问题，解决方法是把组件的共享状态抽取出来，以全局单例模式管理，这就是vuex的基本思想。

![vuex](http://vuex.vuejs.org/zh-cn/images/vuex.png)

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
// store.commit方法触发状态变更
store.commit('increment')
// store.state获取状态对象
console.log(store.state.count)
```

* Vuex的核心是store，包含着应用中大部分的状态。改变store中的状态的唯一途径是显式地提交mutations

* 字符串模板使用反撇号`，较普通字符串多了插值功能```${var}``` 

  ​

## [Webpack](http://www.jianshu.com/p/42e11515c10f#)

package.json文件是npm说明文件，```npm init```自动创建。貌似package.json文件中不能加注释。

[什么是source maps ](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html) 提供对应编译文件和源文件的方法，方便压缩代码后进行调试。在webpack.config.js文件中的devtool属性配置。

webpack.config.js是webpack的配置文件，包含入口文件路径和打包文件路径。

打包命令package文件中配置后，可以使用配置的命令```npm start```，也可以直接```webpack```打包。

安装webpack-dev-server时需要的webpack版本不存在，解决方法```npm install --save-dev webpack-dev-server@1.9.0```，运行server的命令为```webpack-dev-server```，webpack的本地服务器基于nodejs搭建，默认端口8080。

Loaders是webpack中对各种格式的文件进行处理。eg: scss to css, es6 to es5, json to js等。

配置json-loader： ```npm install --save-dev json-loader```，这个好像得在项目目录下执行才好使。在webpack.config.js文件中的module属性配置。

配置babel：babel的配置选项放在".babelrc"文件中。

配置css-loader： ```npm install --save-dev style-loader css-loader```，这里还有点问题，先留着。



## 知识点

* let和const特性：块级作用域，不存在变量提升
* 弹性盒子父元素设置```display: flex;-webkit-align-items: center;```，子元素y轴居中对齐


