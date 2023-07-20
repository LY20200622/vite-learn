## Vite 使用

### 一、插件使用

1. 依赖安装

```bash
npm add -D @vitejs/plugin-legacy
```

2. 使用插件

```js
// vite.config.js

import legacy from '@vitejs/plugin-legacy'	// 为打包后的文件提供传统浏览器兼容性支持
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
})
```

3. 为了与某些 `Rollup` 插件兼容，可能需要定义插件的执行顺序。使用 `enforce` 来决定插件执行的顺序（在 Vite 核心插件前、后等）。
3. 使用 `apply` 来决定插件使用的模式（开发、生产等）。

```js
// vite.config.js

import image from '@rollup/plugin-image'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      ...image(),
      enforce: 'pre',	// pre-在Vite核心插件之前调用、post-在Vite核心插件之后调用、默认post
      apply: 'build',	// build-仅在生产模式调用、serve-仅在开发模式调用
    }
  ],
})
```



### 二、构建生产版本

使用命令 `vite build`

#### 2.1 浏览器兼容

+ Vite 默认目标是 <font color="#98C379">支持原生 ESM script 标签、支持原生 ESM 动态导入 和 import.meta</font> 的浏览器。Vite 默认只进行语法转译，不包含任何的 `polyfill`。可以使用插件 `@vitejs/plugin-legacy` 来自动生成传统版本的 `chunk` 以及与其相对应 ES 语言特性方面的 `polyfill`。

#### 2.2 公共基础路径

+ 若需要在嵌套的公共路径下部署项目，使用 `base` 配置项。

```js
export default defineConfig({
  base: '/my/public/path/'
})
```

#### 2.3 自定义构建

+ 使用 `build.rollupOptions` 调整底层 Rollup 选项。

```js
export default defineConfig({
  build: {
    rollupOptions: {
      // ...
    }
  }
})
```

#### 2.4 产物分块策略

+ 使用 `build.rollupOptions.output.manualChunks` 自定义 chunk 分割策略。

#### 2.5 文件变化时重新构建

+ 使用 `build.watch` 在文件修改的时候重新构建。

#### 2.6 多页面应用模式

1. 假定项目结构

```
├── package.json
├── vite.config.js
├── index.html
├── main.js
└── nested
    ├── index.html
    └── nested.js
```

2. 只需要指定多个 html 作为入口点

```js
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'nested/index.html'),
      },
    },
  },
})
```

3. 就可以正常导航到 `/nested/`

#### 2.7 库模式

1. 发布构建的时候，使用 `build.lib`

```js
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),	// 库模式入口
      name: 'MyLib',
      fileName: 'my-lib',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
```

2. 入口文件需包含可以被用户导入的内容：

```js
// lib/main.js
import Foo from './Foo.js';
import Bar from './Bar.js';

export {
	Foo,
  Bar
}
```



### 三、部署静态站点

```bash
# 构建产物
npm run build

# 本地预览构建产物。启动本地静态服务器。
npm run preview
```

+ TODO 部署文件到服务器上



### 四、环境变量与模式

#### 4.1 环境变量

+ 使用 `import.meta.env` 暴露环境变量。内建的例如：`import.meta.env.MODE`、`import.meta.BASE_URL` 等。这些值会在构建时被静态替换。

#### 4.2 .env 文件

+ 可以将额外的环境变量写在 `.env` 文件。优先级低于在命令行中的形式。

```
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

+ 以 `VITE_` 开头的变量，会通过 `import.meta.env` 暴露给客户端。

```
VITE_MY_KEY=LY

OTHER_KEY=LIAM
```

+ 可以使用 `$` 来使用变量

```
KEY=123
NEW_KEY1=test$foo   # test
NEW_KEY2=test\$foo  # test$foo
NEW_KEY3=test$KEY   # test123
```

+ 可以在 `src/vite-env.d.ts` 来定义环境变量的类型。

#### 4.3 HTML 环境变量替换

```html
<div>My Key is %VITE_MY_KEY%</div>	<!-- 如果VITE_MY_KEY不存在，则不会进行替换 ->
```

#### 4.4 模式

1. 开发服务器的环境一般是 `development` 。线上一般是 `production`。

2. 可以通过命令行覆盖 mode，同时需要新建 `.env.staging` 文件。

```bash
vite build --mode staging
```

















































