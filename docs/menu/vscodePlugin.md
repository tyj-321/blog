## vscode 插件demo
## 写在前头
- 我现在刚参加工作，是一枚前端小白，使用的代码编辑器就是vscode，vscode是微软出的一款轻量级代码编辑器，免费而且功能强大，以功能强大、提示友好、不错的性能和颜值俘获了大量开发者的青睐，真的非常好用，我大学期间经常会遇到一个新的，不会用的代码编辑器，学语言2分钟，学编辑器两小时，真的很苦恼:angry:，我只是想好好写代码:weary:，如果你也想用vscode来写代码的话，赶紧去vscode官网下载吧。这篇文章主要写写创建一个vscode插件的demo。需要用到[Visual Studio Code](https://code.visualstudio.com/)和[node.js](https://nodejs.org/zh-cn/)
## 开始创建
- 安装完以上两个工具后，还需要一个可以生产插件代码的东西，也就是[Yeoman](https://yeoman.io/)，可以使用`npm`安装，打开`cmd`命令行或者vscode终端，输入下面命令
```
npm install -g yo generator-code
```
- 完成上面的安装，输入下面命令
```
yo code
```
- 接着就会出现如下界面

![An image](../public/vscodePlugin/yo.png)

- 根据提示选择

![An image](../public/vscodePlugin/yo1.png)

:::tip
这里根据自己的插件实际情况选择即可
:::

- 如此之后就会把你的以上选项配置在`package.json`这个文件中，然后就会产生一个像下面的这样的目录结构，我就用别人的图吧:smirk:

![An image](../public/vscodePlugin/yo2.png)

- 然后用vscode中新建窗口打开这个生产的文件夹，按照下面的步骤开始调试，或者在打开文件后直接使用快捷键F5

![An image](../public/vscodePlugin/yo3.png)

- 这时会打开一个新的窗口，使用快捷键`Ctrl + Shift + p`，在输入框中输入`hello world`

![An image](../public/vscodePlugin/yo4.png)

- 然后就会看到窗口中显示了`hello world`

![An image](../public/vscodePlugin/yo5.png)

- 这样就完成一个简单的vscode插件demo，这个插件的功能代码主要在`extension.js`文件中，下面这句代码就是在窗口中显示字段，[官网的api](https://code.visualstudio.com/api/references/vscode-api#api-patterns)文档提供了可操作的api接口，全是英文看着贼难受:dizzy_face:，oh my god，根据特定需要的功能去找找吧，good luck!:pray:
```js
// Display a message box to the user
vscode.window.showInformationMessage('Hello World from hello world!');
```
- 当然要想实现的功能是根据你自己的需要去修改代码的，`packege.json`文件中也可以修改触发插件的时机，这个在[官网文档](https://code.visualstudio.com/api/references/activation-events)也提供了详细的事件触发介绍
```json
"activationEvents": [
	"onCommand:hello-world.helloWorld"
],
```
## 发布
- 我还没有什么成果可以发布，有需要可以去网上找找怎么发布，比如[这里](https://blog.csdn.net/Suwanqing_su/article/details/105947156)
## 总结
- 想要创建一个vscode插件还是很容易的，如果想要实现特定的功能，则需要花时间去阅读官方文档(全是英文)，然后去撰写代码，还是有一定的难度，一个好的插件能大大提高开发效率，这也需要在日常的工作和开发项目过程中去找灵感，用想法就去做吧，成就感超满。:100: