## JS的数据类型总结
### 基本数据类型
- js的基本数据类型包括 `string`(字符串)、`number`(数字)、`boolean`(布尔值)、`null`(空)、`undefined`(未定义)、`symbol`(符号)
### 引用数据类型
- js的引用数据类型包括 `array`(数组)、`object`(对象)
:::tip
js是一种弱类型语言，js的变量在没有赋值的时候是没有确定的数据类型的，只有在这个变量被赋值才能决定当前的数据类型，变量的数据类型完全由值所决定，这其中还有可能有隐形的类型转换，这样的好处就是申明变量以及赋值会非常便利，但是有时候也会因为分不清数据类型而出错
:::
### `Number`运算符转换规则
- `null` ---> 0
- `undefined` ---> `NaN`
- `true` ---> 1;  `false` ---> 0
- string类型 ---> 按照数字常量规则，失败则返回`NaN`
### `String`运算符转换规则
- `null` ---> `'null'`
- `undefined` ---> `'undefined'`
- `true` ---> `'true'`;  `false` ---> `'false'`
- number类型 ---> 转换成对应字符串
### `Boolean`运算符转换规则
- 除了 `undefined`、`null`、`0或-0或+0`、`NaN`、`''`(空字符串)为false   其余全为true
### js中数据类型判断
- `typeof`方法<br>
1、错误结果：`typeof(null)`会得到结果为`object`<br>
2、对对象类型及其子类型，如函数、数组都会返回`object`结果
- `instanceof`方法<br>
1、`array instanceof object`和`array instanceof array`的结果都是true，因为根据原型链，object的构造函数在arr的原型链上，所以仍然无法判断一个值是数组还是普通对象<br>
2、`Object.prototype.toString.call()`方法能准确判断所有数据类型