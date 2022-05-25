## css 布局

## 写在前面

在之前的传统解决css布局的方案中，基于盒子模型，依赖display属性 + position属性 + float属性来进行定位的时候，还是会存在特殊情况很不方便，垂直居中就不容易实现，而且滥用绝对定位容易造成后期维护困难

## flex  布局

##### 特点

- 任何元素都可以指定为flex布局
- 设置flex布局后，子元素float、clear和vertical-align属性将失效

##### flex属性

- `flex-direction: row | row-reverse | column | column-reverse`设置排版方向。默认值是`row`，即横向排版，左上角开始；`row-reverse`代表横向排版，但是是右上角开始；`column`代表竖向排版，左上角开始；`column-reverse`代表竖向排版，但是是左下角开始
- `flex-wrap:nowrap | wrap | wrap-reverse`设置超出主方向布局位置是否换行。默认是`nowrap`，即不换行；`wrap`代表换行，从左到右，从上到下；`wrap-reverse`代表换行，从左到右，从下到上
- `flex-flow`是`flex-direction`和`flex-wrap`属性的简写，默认`row nowrap`

- `justify-content:flex-start | flex-end | center | space-around | space-between | space-evenly`设置flex布局在主轴方向上的排版方式。默认值`flex-start`代表主轴方向以此排列(左对齐)；`flex-end`代表主轴反方向排列(右对齐)；`center`代表主轴方向居中；`space-aroud`主轴上依次等间距排列；`space-between`中间等间距，两端无间距；`space-evenly`严格等距
- `align-items:flex-start | flex-end | center | baseline | stretch`设置针对子元素在非主轴上的排版方式。`flex-start | flex-end | center`和`justify-content`同理；`baseline`会沿着基线排列，`stretch`在没有固定高度和宽度的时候伸展到全部
- `align-content`和`justify-content`规则相同，只是代表非主轴

##### flex子元素属性

- `order`设置该元素的排列顺序位置，数值越小，排列越靠前。默认为0
- `flex-grow`把剩余空间按比例分配给指定子元素
- `flex-shrink`把超出空间按比例子元素缩小
- `flex-basis`定义元素大小，和设置width效果一样
- `flex`是`flex-grow`和`flex-shrink`和`flex-basis`的简写
- `align-self`可以单个子元素设置对齐方式，允许个性，可以覆盖父元素的`align-self`属性

## grid布局

在元素上声明`display:grid`就可以创建一个网格容器(块级元素)，这个元素的所有直系子元素将成为网格项目(`display:inline-grid`可以声明一个行内块级元素)

##### 容器属性

- `grid-template-colums`用来定义网格中的行，即列宽
- `grid-template-rows`用来定义网格中的列，即行高
- `repeat()`可以简化重复值，使用`repeat(auto-fill,200px)`表示一行元素数量按照最大容量放置
- `fr`关键字，代表的是网格容器中可用空间的一等份
- `minmax()`函数，可接受的最小长度和最大长度范围，两个参数，分别为最小值和最大值
- `auto`关键字代表长度最终由浏览器决定
- `grid-row-gap`、`grid-column-gap`属性分别设置行间距和列间距，`grid-gap`是两者的简写
- `grid-auto-flow`属性控制着自动布局算法怎样运作，默认`row`，即从左到右填满一行再放入下一行；`row dense`表示尽可能填满，把空余填满；`column`表示先列后行
- `justify-items`设置单元格内容的水平位置，`align-items`设置单元格的垂直位置。`start`是起始位置，`end`是结束位置，`center`是中间位置，`stretch`是拉伸占满
- `justify-content`和`align-content`分别设置网格内容在容器中的水平位置和垂直位置，`start | end | center | stretch | space-around | space-between | space-evenly`这些属性的理解和flex布局很相似
- `grid-auto-columns`和`grid-auto-rows`是设置因为定义网格之外有额外的东西，这个时候可以用这个两个属性进行设置，设置方法和`grid-template-colums`、`grid-template-rows`完全相同

##### 项目属性

- `grid-column-start` 属性、`grid-column-end` 属性、`grid-row-start` 属性以及`grid-row-end` 属性，可以指定网格项目所在的四个边框，分别定位在哪根网格线，从而指定项目的位置

- `justify-self`属性和`justify-items`可以对元素进行个性化的设置，和容器属性`justify-content`类似，只是在元素内设置

## table布局

- 记忆点：根据表格的标签进行对应记忆

`table 相当于 display: table; `
`tr 相当于 display: table-row; `
`td, th 相当于 display: table-cell; `

## 总结一下

css布局要根据实际情况灵活采用布局形式，通过浮动和绝对定位是很好用，但是滥用的话会给后期维护带来巨大的困难，脱离文档流不是一个好的选择，应该尽量少用和慎用，可以通过flex布局和grid布局和table来进行方案替代，这样不会脱离文档流，要根据实际情况选择最佳方案。:100: