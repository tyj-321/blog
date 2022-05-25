## CSS盒模型

#### W3C标准盒子模型

属性`width`,`height`只包含内容`content`，不包含`border`和`padding`

#### IE盒模型

属性`width`,`height`包含`content + padding + border`

- css新增属性`box-sizing`可以设置从而控制盒模型类型

`box-sizing: content-box`(默认值)，代表使用W3C标准盒子模型

`box-sizing: border-box`，代表使用IE盒模型

`box-sizing: inherit`，代表继承父元素的该属性

## 代码测试

```vue
<div class="box"></div>
.box {
  width: 200px;
  height: 200px;
  background-color: pink;
}
```

![image-20220217145052738](../../public/css-box/image-20220217145052738.png)

此时盒子大小

![image-20220217150014252](../../public/css-box/image-20220217150014252.png)

设置`padding: 10px`

![image-20220217145241974](../../public/css-box/image-20220217145241974.png)

此时盒子模型的大小已经发生了改变



![image-20220217145331684](../../public/css-box/image-20220217145331684.png)

设置`border: 5px`

![image-20220217145858454](../../public/css-box/image-20220217145858454.png)

盒子大小发生变化

![image-20220217145927490](../../public/css-box/image-20220217145927490.png)

设置`margin: 20px`

![image-20220217150109457](../../public/css-box/image-20220217150109457.png)

这次盒子大小没有发生变化

![image-20220217150141875](../../public/css-box/image-20220217150141875.png)

设置`box-sizing: border-box`，盒子大小只是200px * 200px

![image-20220217150310530](../../public/css-box/image-20220217150310530.png)

## 总结

W3C标准盒模型：`width` 和 `height`只是`content`的尺寸

IE盒模型：`width = content + padding + border`      `height = content + padding + border`

