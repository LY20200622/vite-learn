## Vite 功能

### 一、NPM 依赖解析和预构建（仅使用开发模式，使用 esbuild）

#### 1.1 原因

+ 因为，原生 ES 导入不支持裸模块导入。依赖可能包含多种模块形式：ESM、CommonJS等
  
  > **裸模块** 指 不带相对路径或绝对路径前缀的模块导入语句。一般裸模块的解析和定位依赖特定的模块解析器或打包工具，例如：Node.js自带的模块解析器、Webpack等

``` js
import React from 'react';
```

+ 所以，Vite 会检测裸模块的导入。进行：
  1. 预解析（由 esbuild 执行）。将 CommonJS / UMD 等转化为 ESM 格式
  2. 重写为合法的URL。即添加上定位路径
  3. 将多个内部模块的 ESM 依赖转换为单个模块。只需要 1 个 http 请求

#### 1.2 自动搜寻依赖

+ 如果没有找到依赖的缓存。Vite 会扫描代码寻找依赖项，将依赖项作为预构建的入口点。在服务器启动后，如果引入了新的依赖项（无缓存），Vite 重新执行依赖项构建。

#### 1.3 Monorepo 和链接依赖

+ Monorepo 启动中，仓库中的某个包可能是另外一个包的依赖。Vite 会检测没有从 `node_modules` 解析的依赖，并将链接的依赖项视为源码。被链接的依赖不会被打包，而是会分析被链接依赖的依赖列表

#### 1.4 缓存

	1. 文件系统缓存。预构建的依赖项缓存到 `node_modules/.vite`
	1. 通过 HTTP 头进行 **强缓存**。`max-age=31536000, immutable`



### 二、模块热替换

+ Vite 提供了原生 ESM 的 HMR API。具有 HMR 功能的框架可以利用该 API



### 三、对类库的支持

#### 3.1 TypeScript

+ Vite 天然支持引入 `.ts` 文件。但仅进行文件的转译工作，而不会进行类型检查
+ Vite 使用 esbuild 将 TypeScript 转译到 JavaScript

#### 3.2 JSX

+ Vite 使用 esbuild 将 JSX 转译到 JavaScript

#### 3.3 CSS

+ 导入 `.css` 文件会把内容插入到 `<style>` 标签中，同时支持 HMR。也可以作为模块默认导出的CSS
+ 支持 `@import` 内联 和 变基保证路径正确性
+ 可以通过 PostCSS 配置，应用于所有导入的 CSS
+ 支持 CSS 模块化。例如：

```jsx
import classes from './test.module.css';
```

+ Vite 内置支持 CSS 预处理器。无需安装插件，只需安装依赖，例如：

```bash
npm add -D less
```

+ 可以通过 `?inline` 来阻止样式注入到页面中。这样做可以防止样式被注入到每个页面上，可以只在需要的组件中使用。例如：

```js
import classes from './test.css?inline';
```

#### 3.4 静态资源处理

+ 导入静态资源会返回解析后的URL

```js
import img from './img.png';

img
// 开发时为：/img.png
// 生产时为：/assets/img.2d8efhg.png
```

+ 加入特殊查询参数，可以修改引入的方式。例如：

```js
import img from './testImg.css?url';
```

+ 可以使用 `new URL` + `import.meta.url` 获取模块的 url。`import.meta.url` 是 ESM 的原生功能。例如：

```js
const img1Url = new URL('./img1.png', import.meta.url).href;

const name = 'img2';
const img2Url = new URL(`./${name}/img2.png`, import.meta.url).href;
```



#### 3.5 JSON

+ 支持导入 JSON。例如：

```js
import jsonObj from './test.json';
```

#### 3.6 Glob 导入（Vite 独有功能）

+ 导入多个模块。例如：

```js
const modules = import.meta.glob('./dir/*.js');

// 转译生成：

const modules = {
  './dir/foo.js': () => import('./dir/foo.js');	// 懒加载，动态导入
  './dir/bar.js': () => import('./dir/bar.js');
}
```

#### 3.7 动态导入

+ 支持带变量的导入（Glob 不支持）。例如：

```js
const module = await import(`./dir/${fileName}.js`);
```

#### 3.8 WebAssembly

+ 预编译的 `.wasm` 文件可以通过 `?init` 来导入。默认导出一个初始化函数，返回值为所导出 wasm 实例对象的 Promise。例如：

```js
import init from './test.wasm?init';

init().then((instance) => {
  instance.exports.testFn();
});
```

#### 3.9 Web Workers

+ 两种方式导入：构造器、查询后缀
  1. 构造器。可以使用 `new Worker()` 和 `new SharedWorker()` 导入。

	```js
	const worker = new Worker(new URL('./worker.js', import.meta.url));
	```
	2. 查询后缀。`?worker` 和 `?sharedworker`。导出是一个自定义 worker 的构造函数
	
	```js
	import DiyWorker from './worker?worker';
	
	const worker = new DiyWorker();
	```
	

### 四、构建优化

#### 4.1 CSS代码分割

+ Vite 会将异步 chunk 中使用到的 CSS 代码进行抽离，并生成单独的文件。在异步 chunk 加载完成时，CSS 文件会通过 `<link>` 标签载入。异步 chunk 会保证在 CSS 加载完毕后执行

#### 4.2 预加载指令生成

+ Vite 会为入口 chunk 和它们在打包出的 HTML 中的直接引入自动生成 `<link rel="modulepreload">` 指令

#### 4.3 异步 chunk 加载优化

+ 假定存在异步 chunk A 和 共用 chunk C。未使用优化的方案是：当 A 被导入，浏览器请求和解析 A，然后知道 A 需要使用 C，此时会造成额外的网络往返：

	```
	Entry --> A --> C
	```
	
	而 Vite 将使用一个预加载步骤自动重写代码，分割动态导入调用。当 A 被请求时，C 也被同时请求：
	
	```
	Entry --> (A + C)
	```
	
	对于更深层的导入，都是支持的。









































