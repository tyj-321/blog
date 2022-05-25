## chrome插件demo
## 写在前头
- 谷歌浏览器提供了可以自定义插件的功能，可以自己一个`html`、`Javascript`、`css`就可以完成一个插件代码的编写，动手开发自己的插件。在这里写一个简单的hello world demo，熟悉开发过程个目录结构。
## 开始开发
- 创建一个插件文件夹`chromePluginDemo`，其中包括`manifest.json`文件，这个文件是每个插件必须要有的文件，用来描述插件的元数据，插件的配置信息，`hello.html`文件，这个文件表示在浏览器窗口展示的html，`hello.png`代表插件图标
:::tip
在任何地方创建都可以，依你的心情
:::
- `manifest.json`文件里面的内容如下
```json
{
    "name": "Hello world",
    "description" : "Hello world Plugin demo",
    "version": "1.0",
    "manifest_version": 2
}
```
:::tip
从上到小，以此代表插件名称，插件描述，插件版本
`manifest_version`此键置定扩展使用的`manifest.json`的版本，目前，此值必须为2，[这里](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/manifest.json/manifest_version)有详细解释
:::
你可以给自己的插件添加一个图标，在`manifest.json`文件中新增下面代码
```json
{
    "name": "Hello world",
    "description" : "Hello world Plugin demo",
    "version": "1.0",
    "manifest_version": 2,
    // 新增下面内容
    "browser_action": {
      "default_popup": "hello.html",
      "default_icon": "hello.png"
    }
}
```
- 创建的`hello.html`文件代码如下
```html
<html>
    <body>
      <h1>Hello Extensions</h1>
    </body>
</html>
```
- 我自己的一个图标`hello.png`

![An image](../../public/chromePlugin/hello.png)

- 修改`manifest.json`，然打开插件时，执行`hello.html`
```json
{
    "name": "Hello world",
    "description" : "Hello world Plugin demo",
    "version": "1.0",
    "manifest_version": 2,
    "browser_action": {
      "default_popup": "hello.html",
      "default_icon": "hello.png"
    },
    // 新增内容
    "commands": {
        "_execute_browser_action": {
            "description": "Opens hello.html"
        }
    }
}
```

## 安装浏览器插件
- 打开谷歌浏览器的扩展程序

![An image](../../public/chromePlugin/1.png)

- 进入界面打开开发者模式，点击加载已解压的扩展程序，选择你创建的`chromePluginDemo`文件夹

![An image](../../public/chromePlugin/2.png)

- 选择插件所在文件夹

![An image](../../public/chromePlugin/3.png)

- 最终结果如下

![An image](../../public/chromePlugin/4.png)

- 然后在谷歌浏览器里打开插件就会看到下面的效果了

![An image](../../public/chromePlugin/5.png)

- 在这里基本就实现了一个简单的`chrome`插件的`demo`，当然你还可以[发布](https://zhuanlan.zhihu.com/p/27203832)到谷歌网上应用商店
:::tip
对于一个chrome插件来说最终要就是功能，创建`.js`文件，其功能可以用`Javascript`语言来写，写完之后在配置文件`manifest.json`中添加`content_scripts`对象数组，从而执行脚本，代码参考下面格式
:::
```json
"content_scripts":[{//需要执行的脚本
      "matches":["http://127.0.0.1/*"],//url符合这个规则，就执行下面的脚本
      "js":[//待执行的脚本列表
         "js/keys.js",
         "js/canvas.js",
         "js/init.js",
         "js/jquery2.1.4.min.js",
         "js/output.js",
         "js/tools.js",
         "js/work.js",
         "js/pdgzf.js"
      ]
   }],
```
## 总结
整个chrome插件的开发还是很简单的，只要有一定的`html`、`Javascript`、`css`基础，开发过程不成问题，只要实现了特定功能，插件可以很大程度上提高开发效率，可以在日常工作中找找灵感。:100: