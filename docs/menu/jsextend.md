## js继承的6种方法
## 原型链继承
- 子类没有使用默认的原型，而是把这个原型指向了父类的实例，这样子类就可以巧妙得拿到父类的属性和方法
```js
// 定义父类
function Parent() {
    this.name = 'Jack';
}
// 父类原型添加方法
Parent.prototype.getName = function () {
    return this.name;
};

// 子类
function Child() {}
// 子类的原型设置为父类Parent的实例
Child.prototype = new Parent();

// 实例化子类
const child = new Child();

console.log(child.getName()); // Jack
console.log(child.name)       // Jack
```
:::warning
#### 优缺点
- 子类可以通过原型链去找到父类的方法并调用，这样父类的方法就可以复用了
- 子类此时不能给父类的构造函数进行传参
- 当父类的属性值是引用类型的数据时，会在子类的所有实例种共享该属性值，这样就会造成子类的实例中出现数据污染，效果如下
:::
```js
// 定义父类
function Parent() {
    this.colors = ['red','bule','yellow'];
}

// 子类
function Child() {}
// 子类的原型设置为父类Parent的实例
Child.prototype = new Parent();

// 实例化子类
const child1 = new Child();
const child2 = new Child();
child1.colors.push('green');

console.log(child1.colors);//[ 'red', 'bule', 'yellow', 'green' ]
console.log(child2.colors);//[ 'red', 'bule', 'yellow', 'green' ]
```
## 盗用构造函数继承
- 就是在子类的构造函数中调用父类的构造函数，通过调用call()、apply()的方式在子类中运行父类的构造函数上下文
```js
function SuperType() {
    this.colors = ['red', 'blue', 'green'];
}
function SubType() {
    // 继承 SuperType
    SuperType.call(this);
}
const instance1 = new SubType();
instance1.colors.push('black');
console.log(instance1.colors); // [ 'red', 'blue', 'green', 'black' ]

const instance2 = new SubType();
console.log(instance2.colors); // [ 'red', 'blue', 'green' ]
```
:::warning
#### 优缺点
- 这个时候不会出现数据污染的情况，但是这些方法就得不到复用了，每次创建实例都要创建一次方法
- 这个时候是可以对父类的构造函数进行传参的，但是子类也获取不到父类的原型上的方法了
:::
## 组合继承
- 组合继承就是把上面两者进行了一个整合，这样就可以把优缺点进行互补，这是一种技巧，意思就是我两个都要！
```js
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function () {
    console.log(this.name);
};

function SubType(name, age) {
    // 继承属性
    SuperType.call(this, name);
    this.age = age;
}
// 继承方法
SubType.prototype = new SuperType();
SubType.prototype.sayAge = function () {
    console.log(this.age);
};

const usr1 = new SubType('Nicholas', 29);
usr1.colors.push('black');
console.log(usr1.colors); // [ 'red', 'blue', 'green', 'black' ]
usr1.sayName(); // Nicholas
usr1.sayAge(); // 29

const usr2 = new SubType('Greg', 27);
console.log(usr2.colors); // [ 'red', 'blue', 'green' ]
usr2.sayName(); // Greg
usr2.sayAge(); // 27
```
:::tip
组合继承把两个的优缺点进行了互补，是非常常用的继承方式，也保留了instanceof操作符和isPrototypeOf()方法识别合成对象的能力。
:::
## 原型式继承
`Object.create()`方法接收两个参数：
- 1、定义新对象的原型对象
- 2、新对象定义额外属性的对象(非必要)<br>

原型式继承适用于这种情况，有一个对象，想在它的基础上再创建一个新对象。需要把这个对象先传给`Object.create()`，然后再对返回的对象进行适当修改。本质上，`Object.create()`是对传入的对象执行了一次<font color='red'> 浅复制 </font>
```js
const person = {
    name: 'Nicholas',
    friends: ['Shelby', 'Court', 'Van'],
};
const anotherPerson = Object.create(person);
anotherPerson.name = 'Greg';
anotherPerson.friends.push('Rob');

const anotherPerson2 = Object.create(person);
anotherPerson2.name = 'Linda';
anotherPerson2.friends.push('Barbie');

console.log(person.friends); // [ 'Shelby', 'Court', 'Van', 'Rob', 'Barbie' ]
```
:::tip
- 可以看到`frends`在`anotherPerson`和`anotherPerson2`中共享了，相当于就是拷贝了两个`person`
- 原型式继承非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。但属性中包含的引用值始终会在相关对象间共享，跟使用原型模式是一样的。
:::
## 寄生式继承
- 寄生式继承和原型式继承很相似，通过`Object.create()`方法克隆原型，然后再新增自己的属性和方法，最后把整个结合的对象`return`出去
```js
function createAnother(original) {
    const clone = Object.create(original); // 通过调用函数创建一个新对象
    clone.sayHi = function () {
        // 以某种方式增强这个对象
        console.log('hi');
    };
    return clone; // 返回这个对象
}

const person = {
    name: 'Nicholas',
    friends: ['Shelby', 'Court', 'Van'],
    saylove: () => {
        console.log('love you');
    }
};
const anotherPerson = createAnother(person);

anotherPerson.sayHi(); // hi
anotherPerson.saylove(); //love you
console.log(anotherPerson.name); // Nicholas
console.log(anotherPerson.friends); // [ 'Shelby', 'Court', 'Van' ]
```
:::tip
- 寄生式继承同样适合主要关注对象，而不在乎类型和构造函数的场景。
- 实例的之间引用类型数据仍然是共享的
:::
## 寄生式组合继承
- 在前面组合继承的方式中，存在一个效率问题：父类构造函数始终会被调用两次，一次在是创建子类原型时调用，另一次是在子类构造函数中调用
```js
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function () {
    console.log(this.name);
};

function SubType(name, age) {
    // 继承属性
    SuperType.call(this, name);      // 这里是第一次调用
    this.age = age;
}
// 继承方法
SubType.prototype = new SuperType(); // 这里是第二次调用
SubType.prototype.sayAge = function () {
    console.log(this.age);
};

const usr1 = new SubType('Nicholas', 29);
usr1.colors.push('black');
console.log(usr1.colors); // [ 'red', 'blue', 'green', 'black' ]
usr1.sayName(); // Nicholas
usr1.sayAge(); // 29

const usr2 = new SubType('Greg', 27);
console.log(usr2.colors); // [ 'red', 'blue', 'green' ]
usr2.sayName(); // Greg
usr2.sayAge(); // 27
```
- 下面是寄生式组合继承
```js
/* 核心逻辑 */
function inheritPrototype(subType, superType) {
    let prototype = Object.create(superType.prototype); // 创建对象
    prototype.constructor = subType; // 增强对象
    subType.prototype = prototype; // 赋值对象
}



function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function () {
    console.log(this.name);
};
function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function () {
    console.log(this.age);
};

const usr = new SubType('Jack', 18);
usr.sayName(); // Jack
usr.sayAge(); // 18
console.log(usr.colors); // [ 'red', 'blue', 'green' ]
```
:::tip
这样一来就只调用了一次父类的构造函数，效率就更高了，原型链仍然保持不变，因此instanceof操作符和isPrototypeOf()方法正常有效。
:::
:100: