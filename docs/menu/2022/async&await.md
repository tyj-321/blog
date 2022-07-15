## async/await语法糖真的好用吗

- async/await这个语法糖写起代码来时，行云流水，的确好用，但是这种所有问题都一股脑采用同步的方式，还是会有问题

## 数据请求报错处理
- 在请求数据的时候，一般会用到这个语法糖
```js
async getDetail() {
    this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
    })

    const { id } = this.$route.query
    const { code, data } = await api.getDetail(id)
    this.recordDetail = data
}
```
:::warning
【注意】如果这里的接口请求报错，后续代码是不执行的，此时的`loading`会一直持续，所有这样的代码是没有对接口请求做容错处理的
:::
#### 解决办法
- 1、使用try/catch包裹代码块
```js
async getDetail() {
    this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
    })

    const { id } = this.$route.query
    try {
        const { code, data } = await api.getDetail(asa)
        this.recordDetail = data
    } catch {
        console.log('请求失败')
    } finally {
        this.$toast.clear()
    }
}
```
:::tip
- 此时`catch`里的代码是会执行的，不会一直`loading`，提示会在`finally`里关闭
:::
- 2、直接使用`promise`
```js
async getDetail() {
    this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
    })

    const { id } = this.$route.query
    api
    .getDetail(id)
    .then(res => {
      const { code, data } = res
      if (Number(code) !== 0 || !data) {
        return
      }
      this.recordDetail = data
    })
    .catch(e => {
      console.log('请求失败')
    })
    .finally(() => {
      this.$toast.clear()
    })
}
```
:::tip
此时`catch`里的代码是会执行的，不会一直`loading`，提示会在`finally`里关闭
:::
## 使用两者的差异与选择
- 可以看出来，两者确实把问题都解决了，其实用起来的差异也不是很大，可以根据个人习惯进行选择，但是`await`因为会一直等待，所以代码块的执行时间会一直等着接口请求回来才会往后执行，这样就会造成代码的执行时间很大程度上取决于网络通信时间，如下实验结果所示

![image-20220217145052738](../../public/async&await/image1.png)

:::tip
这个延迟在很大程度上可以被现在硬件强大的算力，通信能力规避掉，所以实际并没有太多差异，都在毫秒级，1秒以内，所以这个语法糖的弊端并不明显，而且一般只在接口请求时使用，其他地方也没有使用，问题呈现并不是很明显
:::
## 总结
还是能用`promise`就不用`async/await`吧，实在要用也可以，一定要记得用`try/catch`包裹，其实统一使用`promise`挺好的，加上`promise.all`等一些函数使用还能同时并发异步发起多个请求，也能提升性能，这点性能虽然微乎其微，但是也是一种优化手段 :100: