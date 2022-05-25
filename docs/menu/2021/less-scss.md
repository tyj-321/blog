## css预处理器

- 定义变量

  @变量名：变量值

  ```css
  // 定义变量
  @bgColor: #f5f5f5;
  
  // 引用变量
  body{
      background-color: @bgColor;
  }
  ```

  

- 使用嵌套

  通过对象的形式进行嵌套

  ```less
  .container {
    width: @containerWidth;
  
    > .row {
      height: 100%;
      a {
        color: #f40;
  
        &:hover {
          color: #f50;
        }
  
      }
    }
  
    div {
      width: 100px;
  
      .hello {
        background-color: #00f;
      }
  
    }
  }
  ```

  &是父选择器，即a:hover

- 样式代码复用

  ```less
  /* 定义一个类 */
  .roundedCorners(@radius: 5px) {   /* 这个参数是缺省值 */
    -moz-border-radius: @radius;
    -webkit-border-radius: @radius;
    border-radius: @radius;
  }
  ```

  ```less
  /* 在less文件中引用上面这个类 */
  #header {
    .roundedCorners;
  }
  #footer {
    .roundedCorners(10px);
  }
  ```

  

- 样式引用 使用@import的方式引用

  定义一个引用的`less`文件，比如`_button1.less`，一般被引用文件前面加下划线

  ```less
  .btn{
    line-height: 100px;
    color: @btnColor;
  }
  ```

  在`main.css`中引入

  `@import url('_button1.less')`

## css预处理器scss

- 定义变量

  $变量名：变量值

- 只用嵌套和less类似

- 混合器

  使用`@mixin`标识符定义，有点想c语言的宏定义，可以重复使用，一样可以指定参数和缺省值

  ```scss
  @mixin rounded-corners {
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
  }
  ```

  通过`@include`来使用这个混合器

  ```scss
  div {
      @include rounded-corners;
  }
  ```

- 样式文件导入  通过`@import`来导入外部文件

  ```scss
  @import 'input.scss'
  ```

  如果需要导入 SCSS 文件，但又不希望将其编译为 CSS，只需要在文件名前添加下划线，这样会告诉 Sass 不要编译这些文件，但导入语句中却不需要添加下划线。

- 样式继承

  ```scss
  .container {
     color : purple ;
     border : 2px dashed purple ;
  }
  .myText {
     @extend .container; //这里将继承.container类的所有样式
     font-size : 22px ;
  }
  ```

  

- if条件循环

  `@if  条件{}`

  `@else 条件{}`

- for和while循环

  `@for $i from 1 to 10 {}`

  `@while $i > 0 {}`

- each命令，作用和for类似

  `@each $member in a,b,c,d {}`

- 自定义函数

  `@function double ($n) {@return $n * 2}`

## 总结

总得来说css预处理器scss和less就是用编程思想来写css，避免css嵌套产生冗余的代码，也不美观，scss比less功能会更加强大一点，更具编程逻辑。注：scss是sass的升级版，一般用scss就可以了，也更加合理