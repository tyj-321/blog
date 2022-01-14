## 子组件改变父组件值
### 子组件调用父组件的事件
vue中为了保证数据的可维护性，保证数据可控，状态改变可追溯，数据在组件中是单向的，就是只能从父组件往子组件传递数据，子组件可以使用该数据，但是不可以修改该数据
- 如果子组件想要改变父组件传来的`props`数据，vue提供了一个方式，就是在子组件去调用父组件的事件，即`this.$emit`方法，相当于说子组件可以去修改父组件传来的`props`数据，但是需要通知父组件，最终还是让父组件去做修改，这样就可以追溯改变的状态
### 使用v-model巧用来子组件修改状态
- 父子组件可以使用`v-model`来是实现父子组件之间的数据双向绑定，子组件修改`props`会因为是双向绑定同步改变父组件的对应值，就可以不使用`this.$emit`方法。但是也并非完全不可追溯，因为子组件只能在`props`中用一个`value`值来接收，改变这个值必须使用`this.$emit('input', payload)`
```vue
<template>
    <div>
        祖父组件 <button @click="handleGrandFatherChange">改变值</button>
        <h5>{{ name }}</h5>
        <Father v-model="name"></Father>   <!-- v-model来绑定 -->
    </div>
</template>

<script>
import Father from './Father.vue'
export default {
  name: 'GrandFather',
  components: { Father },
  data() {
    return {
      name: {
        zh: '甲骨文球馆',
        eg: 'Oracle Arena'
      }
    }
  },
  methods: {
    handleGrandFatherChange() {
      this.name = {
        zh: '祖父组件',
        eg: 'GrandFather'
      }
    }
  },
}
</script>
```
```vue
<template>
    <div>
        父组件 <button @click="handleFatherChange">改变值</button>
        <h5>{{ value }}</h5>
        <Son v-model="value"></Son>
    </div>
</template>

<script>
import Son from './Son.vue'
export default {
  name: 'Father',
  components: { Son },
  props: {
    value: {
        type: Object,
        default: () => {}
    },
  },
  methods: {
    handleFatherChange() {
      let newObj = {
        zh: '父组件',
        eg: 'Father'
      }
      this.$emit('input', newObj)   // input事件来改变
    }  
  }
}
</script>
```
:::tip
上面的两种方式子组件最多只能改变其父组件及所有子组件的数据，并不能响应式改变曾父组件及以上父组件的数据，当组件嵌套很深的时候，就必须一层一层向上传值并改变，也就是说数据流始终还是单向的，并没有改变，只是相对来说第二种方式书写简单些，但是一定程度上牺牲了可读性<br>
如果子组件要修改props传来的状态值，可以，但是必须要通知其父组件，通知的方式分为以上两种
:::
### 特殊情况
`props`传递值基本上是符合以上规律的，但是如果传入是引用型数据类型的其中一部分，就会子组件自动影响到曾父组件
```vue
<template>
    <div>
        祖父组件 <button @click="handleGrandFatherChange">改变值</button>
        <h5>{{ name }}</h5>
        <Father v-model="name"></Father>
    </div>
</template>

<script>
import Father from './Father.vue'
export default {
  name: 'GrandFather',
  components: { Father },
  data() {
    return {
      name: ['1','2','3']    // 传递数组
    }
  },
  methods: {
    handleGrandFatherChange() {
      this.name = ['1','2','grandfather']
    }
  },
}
</script>
```
```vue
<template>
    <div>
        父组件 <button @click="handleFatherChange">改变值</button>
        <h5>{{ value }}</h5>
        <Son v-model="value[2]"></Son>   <!-- 传递数组索引号2的值 -->
    </div>
</template>

<script>
import Son from './Son.vue'
export default {
  name: 'Father',
  components: { Son },
  props: {
    value: {
        type: Array,
        default: () => []
    },
  },
  methods: {
    handleFatherChange() {
      let newArray = [['1','2','father']]
      this.$emit('input', newArray)
    }  
  }
}
</script>
```
```vue
<template>
    <div>
        子组件 <button @click="handleSonChange">改变值</button>
        <h5>{{ value }}</h5>
        <GrandSon v-model="value"></GrandSon>
    </div>
</template>

<script>
import GrandSon from './GrandSon.vue'
export default {
  name: 'Son',
  components: { GrandSon },
  props: {
    value: {
        type: String,
        default: () => ''
    },
  },
  methods: {
    handleSonChange() {
      this.$emit('input', 'son') // 只修改父组件传来的数组索引号为2的值
    },
  },
}
</script>
```

![An image](../public/v-modelSkill/image_1.png)

![An image](../public/v-modelSkill/image_2.png)

这种特殊情况，子组件做修改，就会间接影响到曾父组件

### 写在一块
1)、vue中的数据流始终还是单向的，避免因为子组件修改状态而导致状态不可追溯的情况发生<br>
2)、组件尽量还是不要嵌套太多了，否则可读性会大大降低，最多3层会更方便维护和管理<br>
3)、如果实在要做组件嵌套，子组件要修改状态又要传给曾父级及以上级组件，可以把要用到的部分传入，这样可以实现曾父级及以上级组件响应式同步修改