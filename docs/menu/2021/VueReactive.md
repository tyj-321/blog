## Vue中的响应式原理

[Vue的官网](https://cn.vuejs.org/v2/guide/reactivity.html)写了Vue2.x中的响应式原理是基于ES5的一个特性，即[`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)方法

> `Object.defineProperty()`方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象

用法：`Object.defineProperty(obj, prop, descriptor)`

`obj`：要定义属性的对象

`prop`：要定义或修改的属性的名称，即key值

`descriptor`：要定义或修改的属性描述符

在Vue2里创建响应式的源码主要用到的是存取描述符`get`和`set`，所以其他的可以了解，这两个的方法如下 :point_down:

- `get`：一个给属性提供`getter`的方法，如果没有`getter`则为`undefined`。该方法返回值被用作属性值。默认为`undefined`。
- `set`：一个给属性提供`setter`的方法，如果没有`setter`则为`undefined`。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认值为`undefined`。
:::warning
这个是一个对象的方法，所以对于数组，是没有办法进行监听的，所以数组要实现响应式。需要对数组的原型方法进行重写，也就是在使用这些原型方法的时候要多进行一个视图更新的操作
:::
```js
// 重写数组原型方法
// 重新定义数组原型，Object.defineProperty不具备监听数组的方法
const oldArrayProperty = Array.prototype;
const arrProto = Object.create(oldArrayProperty);
["push","pop","shift","unshift","splice"].forEach(
    methodName => 
    (arrProto[methodName] = function() {
        // 更新视图
        updateView();
        oldArrayProperty[methodName].call(this, ...arguments);
    })
)
```
- 下面对传入的data属性进行深度监听
```js
function observer(target){
    if(typeof target !== 'object' || target === null){
        return target
    }

    // 如果是数组类型,重写数组原型的方法("push","pop","shift","unshift","splice")
    if(Array.isArray(target)){
        target.__proto__ == arrProto;
    }

    // 如果是对象，遍历对象所有的属性，并使用Object.defineProperty把这些属性全部转为getter/setter
    for(let key in target){
        defineReactive(target,key,target[key])
    }
}
----------------------------------------------------------------------------------------------
function defineReactive(target, key, value){
    // 如果对象有更多的层级，再次调用observer监听方法，实现深层次的监听。
    observer(value);

    Object.defineProperty(target, key, {
        get(){
            return value;
        },
        set(newValue){
            // 设置值的时候也需要深度监听
            observer(value);

            if(newValue !== value){
                value = newValue;

                // 数据驱动视图，如果数据改变，就调用视图更新的方法。对应到Vue中是执行VDOM
                updateView();
            }
        }
    })
}
----------------------------------------------------------------------------------------------
function updateView(){
    console.log('视图更新操作')
}
```
:::tip
- 其实看这个过程可以看出来，要完成对象的深度监听，其实就是通过递归的方式层层调用，最终实现深层次的响应式监听，是深度优先的
- 利用`Object.defineProperty()`只要对定义的属性进行操作就会触发的性质，就完成了持续监听
:::
:::warning
- 当对象的深度很深的时候，就会因为递归严重影响性能
- 这样的响应式是不支持新增和删除属性的，因为`Object.defineProperty()`方法只能监听到修改，就好像说只要定义好了就没法修改，错过了定义就再也没有机会定义成响应式了，但是可以使用Vue预留的接口`Vue.set(object,key,value)`、`this.$set(this.object,key,value)`、`Object.assign({},this.obj)`
:::
## Vue3中的响应式原理
[Vue3官网](https://vue3js.cn/docs/zh/guide/reactivity.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%93%8D%E5%BA%94%E6%80%A7)解释了响应式的原理，Vue3的响应式原理是基于[Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)来做数据大劫持代理，可以支持原生数组的响应式，不需要重写数组的原型方法，还可以直接支持新增和删除属性
> 该Proxy对象使您能够为另一个对象创建代理，该代理可以拦截和重新定义该对象的基本操作。
- Proxy是使用两个参数创建的，`new Proxy(target, handler)`，其中`target`表示要代理的原始对象，`handler`是一个对象，它定义了哪些操作将被拦截以及如何重新定义被拦截的操作
- `get()`处理程序就是当在对对象的属性值进行读取操作的时候，会触发的拦截操作
- `set()`处理程序就是当在对对象的属性进行设置操作的时候，会触发的拦截操作
- [`Reflect`对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)，给拦截的操作提供的方法，唯独不支持IE
> Reflect是一个内置对象，它为可拦截的 JavaScript 操作提供方法。
- 下面是Vue3里的响应式逻辑 :point_down:
```js
 const proxyData = new Proxy(data, {
   get(target,key,receive){ 
     // 只处理本身(非原型)的属性
     const ownKeys = Reflect.ownKeys(target)
     if(ownKeys.includes(key)){
       console.log('get',key) // 监听
     }
     const result = Reflect.get(target,key,receive)
     return result
   },
   set(target, key, val, reveive){
     // 重复的数据，不处理
     const oldVal = target[key]
     if(val == oldVal){
       return true
     }
     const result = Reflect.set(target, key, val,reveive)
     return result
   },
   // 删除属性
   deleteProperty(target, key){
     const result = Reflect.deleteProperty(target,key)
     return result
   }
 })
```
:::tip
直接声明data对象就可以了，Proxy会直接代理监听data的内容
:::
## 两者比较
- 1、vue2的响应式因为采用的是递归的方式，在对象深度很大时候会影响性能
- 2、vue2是基于es5的特性`Object.defineProperty()`方法，因为这个方法的局限性，所有是没有办法监听对象的新增和删除的，也不支持监听数组
- 3、解决了vue2的弊端，代码更简洁，基于`Proxy`就原生支持数组监听，而且支持对象的新增和删除监听