## webpack5 模块联邦

## 情景

当在做一个微前端的时候，把整个项目已经划分为了各个小的模块，但是在项目实际中，肯定存在很多公用的组件和方法之类的，在做代码迁移的时候，当然是可以直接复制粘贴代码，但是这样肯定就会在每个单独的模块中都出现公用的组件和方法，这样就会造成代码冗余，通过`webpack5 Module Federation`就可以实现共享

## 哪门子用

#### 被引用方配置

- 在`vue.config.js`中去配置好下面内容

```js
/* 引入Module Federation */
const ModuleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin

/* 配置 */
plugins: [
      new ModuleFederationPlugin({
        name: process.env.VUE_APP_CONTEXT,
        library: { type: 'var', name: process.env.VUE_APP_CONTEXT },
        filename: 'remoteEntry.js',
        exposes: {
          './share': './src/share'
        },
        shared: { ...require('./package.json').dependencies }
      })
    ]
```

- `name`：必传且唯一，作为关键名称用于第三方引用，相当于一个alias，引用方式`${name}/${expose}`

- `library`: 声明一个挂载在全局下的变量名，其中name即为`name`的name

- `filename`: 构建后的chunk名称

- `exposes`: 作为被引用方最关键的配置项，用于暴露对外提供的modules模块

- `shared`: 声明共享的第三方资源

#### 引用方配置

```js
/* 引入Module Federation */
const ModuleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin

/* 配置 */
plugins: [
      new ModuleFederationPlugin({
        name: process.env.VUE_APP_CONTEXT,
        filename: 'remoteEntry.js',
        remotes: {
          share: isProd
            ? `share../../share/remoteEntry.js`
            : `share@http://localhost:9000/remoteEntry.js`
        }
      })
    ]
```

- `remotes`：作为引用方最关键的配置项，用于声明需要引用的远程资源包的名称与模块名称

- 其余配置和上面是一样的，这里也可以再通过`exposes`字段再共享出去，实现双向共享

#### 被引用方暴露

```js
/* share.js */
import SearchMix from '../../mixins/SearchMix'
export default {
    SearchMix
}
```

#### 被引用方引入

```js
/* share.js */
const fromShareModule = require('share/share')
const fromShare = fromShareModule.default

export const SearchMix = fromShare.SearchMix
```

在引用方的组件内部就可以引入并使用

```js
import { SearchMix } from '../../share'
```

## 总结一下

模块联邦解决的就是不同组件模块之间的共享问题，避免产生冗余的代码，在微前端的开发中还是很大程度上减少了代码体积，总之能复用就复用，程序员绝对不干重复的事。:100: