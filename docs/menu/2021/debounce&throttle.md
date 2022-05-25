## 防抖和节流
### 防抖
防抖就是一个有点像需要耐心的过程，它事件本身是在比如10秒后触发执行，但是如果你中途，比如5秒的时候又触发了它，是需要代价的，那就是你得重新等上10秒，从头开始计时，比如频繁扣动扳机，只处理最后一次扣动扳机的事件，在回调延迟中触发事件都会重新计时
### 防抖函数实现
```js
/*
*设置一个定时器，开启定时任务，如果延迟中调用，就会清空定时器重新计时，创建新的定时任务
*/
function debounce(func, delay) {
  let timer = null
  return function () {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(func.apply(this, arguments), delay)
  }
}
```
### 节流
节流就是一个有点像强制节制你的行为的过程，说好的10秒后触发执行，就10秒后触发执行，无论你在中途触发执行了多少次，都是最终在10后执行，比如技能冷却就是5秒，那这期间点击并不会触发技能，只有5秒后才能触发技能
### 节流函数实现
```js
/*
*设置一个定时器，开启定时任务，完成后把定时器清空，延迟中调用不执行任何操作
*/
function throttle(func, delay) {
  let timer = null
  return function () {
    if(!timer) {
      timer = setTimeout(() => {
        timer = null
        func.apply(this, arguments)
      }, delay)
    }
  }
}
```