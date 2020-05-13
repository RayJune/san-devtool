# 开发者指南

## 综述

san-devtool 代码仓库按照功能可以分为三块：

### san-devtool chrome extension

它是一个为调试 San 应用而诞生的 [chrome extension](https://chrome.google.com/webstore/detail/san-devtool/pjnngoafflflkagpebgfifjejlnfhahc)，拥有版本检测、查看 Component 信息、调试 store 数据等功能。代码层面上看，除了 ./bin 和 ./hook 之外的代码均是为 chrome extension 服务的。

### npmjs.com/package/san-devtool

它是一个[命令行工具](https://www.npmjs.com/package/san-devtool)，全局安装后可以用 `san-devtool --url=localhost:8005` 这样的方式启动默认的浏览器工具来 inspect 特定页面。bin/san-devtool.js 是这个功能的实现地；

### @ecomfe/san-devhook

它是一个对 San 的 hook，[安装使用](https://www.npmjs.com/package/@ecomfe/san-devhook)后可以在 devtools 的 console 面板中通过访问 `__san_devtool__` 来查看详细信息。该部分的代码实现在 ./hook 处。

## 工具栈

* MVVM 框架：[San](https://github.com/baidu/san)
* UI 组件库：[San-MUI](https://github.com/ecomfe/san-mui)
* 通信相关：[chrome-ext-messenger](https://www.npmjs.com/package/chrome-ext-messenger)
* 打包构建：Webpack 1 （后续考虑升级）
* dynamic stylesheet preprocessor language：[Stylus](https://stylus-lang.com/)

## 目录说明

```bash
san-devtool
├─ bin                                  # npmjs.com/package/san-devtool 相关
├─ docs                                 # 文档相关
├─ hook                                 # @ecomfe/san-devhook 相关
├─ node_modules
├─ src
│  ├─ html
│  │  ├─ devtool
│  │  │  ├─ devtool_background.html     # devtools 的入口文件，用来进行判断是否加载、渲染 devtools 中的 san 面板
│  │  │  └─ panel_index.html            # san 面板
│  │  └─ popup
│  │     └─ popup.html                  # popup
│  ├─ icons                             # 插件所用 icon
│  ├─ js
│  │  ├─ background
│  │  │  ├─ background.js
│  │  │  └─ popup.js
│  │  ├─ common                         # 存放一些通用的功能文件
│  │  │  ├─ constants.js
│  │  │  ├─ task_delayer.js
│  │  │  └─ utils.js
│  │  ├─ devtool
│  │  │  └─ devtool_background.js
│  │  └─ host                           # content-script 操作相关文件集合
│  │     ├─ components.js
│  │     ├─ detector.js
│  │     ├─ highlighter.js
│  │     ├─ hook.js
│  │     ├─ host_entry.js
│  │     ├─ injector.js
│  │     ├─ interchange.js
│  │     ├─ invasion.js                 # content-script 文件
│  │     ├─ listeners.js
│  │     ├─ stores.js
│  │     └─ version.js
│  ├─ manifest.json                     # chrome extension 描述文件
│  └─ panel                             # chrome devtools san 面板
│     ├─ App.san
│     ├─ components
│     ├─ index.js
│     ├─ index.styl
│     ├─ routes.js
│     └─ views
├─ .babelrc
├─ .eslintrc
├─ .gitattributes
├─ .gitignore
├─ CHANGELOG.md
├─ LICENSE
├─ package.json
├─ README.md
├─ webpack.config.babel.js
└─ yarn.lock
```

## 开发调试

待补充
