## TS语法学习

- 在ts里可以规定数据类型，包括`String`、`boolean`、`Number`、`symbol`、`undefined`、`null`、任意类型`any`

```ts
// 这样写就会报错，说是string类型那就说到做到赋值为string类型
let x: string 
x = 1   
// 正确赋值
let x: string 
x = '1'
```

- 数组类型也可以进行约束，说是string类型数组就是string数组类型

```ts
// 下面这样写是会报错的，string类型同理
let arr: number[] 
arr = ['1','2']
// 正确赋值
let arr: number[] 
arr = [1,2]
```

- 还可以约束函数的参数类型和返回类型

```ts
function add(a:number,b:number): number {
  return a+b
}
// 如果没有返回值就使用void
function log(): void {
  console.log('[ 打印 ]')
}
log()
```

- 类型断言，当某些范的值是具体的类型的时候可以用断言语法as

```ts
// 类型断言as
let input:any = '3.1415926'
let len:number = (input as string).length
console.log('[ len ]', len)    // [ len ] 9
```

- 联合类型，表示可以是某某类型也可以是另外某某类型

```ts
// 联合类型
let age: string | number
age = '23'
age = 23
```

如果是联合对象类型，只能获取复杂类型的公共属性，不同属性是会报错的

```ts
interface dog {
  name:string,
  wang: () => void
}
interface cat {
  name:string,
  miao:() => void
}
const animal = ():dog | cat => {   // 用`|`表示联合类型
  return {
    name: 'aa',
    miao: () => {
      console.log('[ name ]', name)
    },
    wang: () => {
      console.log('[ name ]', name)
    },
  }
}
let obj = animal()
console.log('[ obj.name ]', obj.name)
console.log('[ obj.miao ]', obj.miao)  // 报错
```

如果是交叉对象类型，可以获取所有复杂类型的成员，不会报错

```ts
interface dog {
  name:string,
  wang: () => void
}
interface cat {
  name:string,
  miao:() => void
}
const animal = ():dog & cat => {   // 用`&`表示交叉类型
  return {
    name: 'aa',
    miao: () => {
      console.log('[ name ]', name)
    },
    wang: () => {
      console.log('[ name ]', name)
    },
  }
}
let obj = animal()
console.log('[ obj.name ]', obj.name)
console.log('[ obj.miao ]', obj.miao)  // 不报错
```

- 函数参数是否可选

```ts
function praise(name:string,msg?:string):void {
  console.log(name + msg)
}
praise('tangyongjie')    // msg是可选参数
```

- type关键字的作用就是给类型起个新的名字

type可以声明基本类型(`string`、`number`...)别名，联合类型，元组类型等

元组类型就是一个数组结构中既有`number`类型、又有`string`类型、`boolean`类型等

- interface关键字和type使用差不多，一般用于声明对象或函数类型，且可以合并

[type和interface的区别](https://juejin.cn/post/6844903749501059085)

- 泛型

> 类型是用来描述变量代表的数据的细节，而泛型则用来代表类型的细节

在类型未知的情况下，使用泛型可以自动根据实际情况使用不同的类型，实现类型的重用，把类型看作是参数

```ts
function add<T>(arg1:T,arg2:T):T {
  return arg1 + arg2
}
add<number>(1,2)         // 3      是number类型就会相加
add<string>('mot','her') // mother 是string类型就会合并
```

