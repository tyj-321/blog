## Event-loop与微任务，宏任务
- Javacript是一个单线程的脚本语言，避免出现两个线程同时对某个数据进行操作导致数据污染的情况。
- 但是正是因为Javacript语言的这种特点，当某个代码操作在执行一个大量的计算，会导致后续代码一直在等待，给用户看到就是一种页面假死的状况，所以需要异步执行一些代码，当执行完毕时调用事先的回调函数，这期间就可以不等待而执行其他的事务。
- js的异步而任务分为宏任务和微任务，两者有自己分别的任务队列，出现一个宏任务 ---> 执行宏任务 ---> 有微任务就执行微任务 ---> 执行微任务 ---> 继续循环该过程

![An image](../../public/event-loop/0.png)

:::tip
注意是队列数据结构，我开始一直以为是栈的数据结构，理解了半天
:::
宏任务大概包括`setTimeout`，`setInterval`
微任务大概包括`promises`，`.then()`

- 整个过程可以这样理解，一群人去银行排队等待人工窗口的客服，每个人可以看成一个一个宏任务，形成的宏任务队列，当主线程上同步的代码执行完毕后，就会开始在宏任务中以队列的方式取出一个任务进行，同时看看还有没有微任务，如果有，执行完微任务再执行下一轮的循环，就像当第一个用户在进行宏任务的时候，比如取款服务，他可能还需要执行微任务，比如理个财，买个保险啥的，等把这个用户的所有任务都执行完后，即相当于完成了一次事件循环，然后处理下一个用户的任务，即进入下一次循环，直到所有的宏任务队列，微任务队列都执行完毕结束。
- 所以再来看看`setTimeout`函数
```js
setTimeout(() => {
    task();
},3000)

setTimeout(() => {
    task();
},0)
```
以上两个`task()`实际并不是说在3s后执行，立即执行，是指经过3s后把`task()`放入任务队列中，和立即放入任务队列，如果在执行这个队列之前主线程需要等待，比如`sleep(10000)`，`task()`仍然会等着，时间超过3s以上。
- 后面的数字所指的时间是经过多少时间把该任务放入任务队列，可不管主线程什么时候空闲了来执行
- `setInterval`函数是同样的道理

唯一需要注意的一点是，对于`setInterval(fn,ms)`来说，我们已经知道不是每过ms秒会执行一次fn，而是每过ms秒，会有fn进入Event Queue。一旦setInterval的回调函数fn执行时间超过了延迟时间ms，那么就完全看不出来有时间间隔了。这句话仔细读一读。:100: