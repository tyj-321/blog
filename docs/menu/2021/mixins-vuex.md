## Vue mixins混入使用以及Vuex

- 当组件之间有相似的部分，这些相似的东西包括data,method,watch,周期函数等等，如果去重复书写这些内容会造成代码的冗余(程序员真的很懒，但又很聪明，让自己的懒惰得以合理)
- mixins(混入)，官方描述是一种分发Vue组件中可服用功能的非常灵活的方式，只要把共用的功能以对象的方式传入mixins选项中，使用mixins对象的选项就可以混入其他组件的功能，从而来实现代码复用。

## 特点

1、当在两个组件中都引入了混入对象，混入对象内的data，method等都不共享，是根据组件的不同而完全独立的。

定义一个`mixins.js`文件并封装参数和方法

```js
export const Mixins =  {
    components: {
    },
    data() {
        return {
            age: 18
        }
    },
    methods: {
        getAge() {
            console.log(this.age)
        }
    },
    mounted () {
        this.getAge()
    },
}
```

在组件1`test1.vue`中对参数进行操作，组件2`test2.vue`中也进行不同于组件1的操作

```js
import { Mixins } from '../../mixins/mixins'
    export default {
        name: 'test1',
        mixins: [Mixins],
        data() {
            return {
            }
        },
        created () {
            this.age ++
        },
    }
```

```js
import { Mixins } from '../../mixins/mixins'
    export default {
        name: 'test2',
        mixins: [Mixins],
        data() {
            return {
            }
        },
        created () {
            this.age += 2
        },
    }
```

![An image](../../public/mixins-vuex/0.png)

可以看到组件1和组件2中的参数是各自独立的。

## 混入冲突解决

- 这个很好理解，就是当混入的参数和方法等和组件内的有重复的，相同的部分，一律以组件内的为准，混入的就是外来的，就是次要的。
- 如果混入对象包括了生命周期钩子函数，则混入对象的钩子函数在组件里的钩子函数之前调用

## Vuex

## 写在前头

当某些状态会在多个组件之间使用的时候，比如用户的昵称，头像等信息，当这些状态发生变化的时候，所有与之相关的组件的对应状态都要发生改变，这个时候就可以使用集中的状态管理。

Vuex的核心就是仓库store，这个store实例可以注入到所有的子组件里面并使用。

- 核心对象

- state，就是状态，类似data

```js
state: {
        list:[1,2,3,4,5,6,7,8,9]
    },
```

其他组件想要调用该状态可以使用`this.$store.state.list`

如果想要使用映射的方式引用，则需要引入`mapState`

```js
import { mapState } from 'vuex'
```

在computed对象中，这样在该组件可以通过`this.count`访问到state的count

```js
computed: {
    ...mapState(['count'])
  },
```

- getters，就是对状态的计算，有点像computed

```js
getters: {
    	// 过滤出数组中偶数
        filterList(state) {
            return state.list.filter((item) => {
                return item % 2 === 0
            })
        },
        // 获得过滤后的数组的长度
        getDoneFilterListLen(state, getter) {
            return getter.filterList.length
        }
    },
```

其他组件想要调用该计算属性可以使用`this.$store.getter.filterList`

则需要引入`mapGetters`

```js
import { mapGetters } from 'vuex'
```

同样可以采用映射的方式，可以通过`this.filterList`访问到getters

```js
...mapGetters([
      'filterList',
      'getDoneFilterListLen'
    ])
```

- mutations，就是对状态的处理，类似method

```js
mutations: {
        add(state){
            state.count++
        },
        down(state){
            state.count--
        }
    },
```

其他组件在调用的时候使用`this.$store.commit('add')`

通过映射引用，需要引入`mapGetters`

```js
import {mapMutations} from 'vuex'
```

```js
...mapMutations({
      add: {
        type: 'add',
        load: 100
      }
    }),
```

可以通过`this.add()`访问到

还可以提交载荷，就是提交时有额外的参数，比如增加对应参数的值

```js
add(state, load){
            state.count += load
        },
```

```js
this.$store.commit('add',100)
```

这个时候就会根据传入的参数100进行增加计算

:::tip

最好采用对象的形式来传入载荷，这样可读性会更好

:::

```js
this.$store.commit('add',{
	load: 100
})
```

```js
this.$store.commit({
    type: 'add',
    load: 100
})
```

:taco:

:::tip

- 最好提前在你的 store 中初始化好所有所需属性。
- 当需要在对象上添加新属性时，你应该使用` Vue.set(obj, 'newProp', 123)`, 或者以新对象替换老对象。
- mutations必须是同步函数

:::

- actions，类似与mutations，但是又存在下面不同

  1、Action 提交的是 mutation，而不是直接变更状态。

  2、Action 可以包含任意异步操作。 前面说过mutation只能包含同步事务，所以在处理异步事务就需要Action，通过Action控制了异步这一过程，之后再去调用mutation里面的方法来改变状态。

写一个action

定义state

```js
state: {
  product: 'car'
}
```

mutations中顶一个方法

```js
changeProduct(state, payload) {
  state.product = payload.change;
}
```

actions的定义

```js
actions: {
  changeProduct(context, payload) { // 这个context是一个与 store 实例具有相同方法和属性的对象
    // 调用mutation里的changeProduct方法
    // context.commit('changeProduct', {change: 'ship'});
    // 改成异步方式
    // setTimeout(() => {
    //   context.commit('changeProduct', {change: 'ship'});
    // }, 1500)
    // 使用载荷
    let temp = 'ship+' + payload.extraInfo; 
    setTimeout(() => {
      context.commit('changeProduct', {change: temp});
    }, 1500)
  }
}
```

在组件的methods中分发

```js
methods: {
  selectProduct() {
    // this.$store.dispatch('changeProduct')
    // 载荷方式分发
    // this.$store.dispatch('changeProduct', {
    //   extraInfo: 'sportcar'
    // })
    // 或者这种
    this.$store.dispatch({
      type: 'changeProduct',
      extraInfo: 'sportcar'
    })
  }
},
```

映射的话和mutations的道理是一样的

## 写在一块

actions里面可以执行异步函数，当异步结束时去调用mutations里的方法，实际上也可以在异步执行后的状态再去修改信息，可以借助Promise来实现

最后vuex还提供了模块化的管理办法，默认情况下，mutations、actions、getters这些都是注册在全局上面的，你可以直接调用，如果希望你的模块具有更高的封装度和复用性，你可以通过添加`namespaced: true`的方式使其成为带命名空间的模块。:100:

